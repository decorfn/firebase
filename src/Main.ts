export * from './decorators';
export * from './Main';
import * as functions from 'firebase-functions';
import { ClassKeys } from './decorators';

interface FunctionsIndex {
	[key: string]: any;
}

export class Controller implements FunctionsIndex {
	[key: string]: any;
}

export class Main {
	_controllers: Controller[] = [];
	public set controllers(controllers: Controller[]) {
		this._controllers = controllers;
	}
	// calling it in index.ts where it will fill the file with the functions
	protected start() {
		// iterating over all controllers/classes
		for (let controller of this._controllers) {
			// making sure we're only passing our Controller class through an iterator;
			let classProto = Object.getPrototypeOf(controller);
			let cMiddle = Reflect.getMetadata(ClassKeys.CallMiddleware, classProto);
			for (let fn in controller) {
				let functionProto = Object.getPrototypeOf(controller[fn]);
				let fnOptions = Reflect.getMetadata(ClassKeys.Options, functionProto);
				let fnName = Reflect.getMetadata('fnName', functionProto);
				let fnMiddleware = Reflect.getMetadata(ClassKeys.CallMiddleware, functionProto);

				if (fnOptions.type === 'onCall') {
					exports[controller.constructor.name + '_' + fnName] = functions
						.region(fnOptions.region)
						.https.onCall((data: any, context: functions.https.CallableContext) => {
							let middleware = [...cMiddle, ...fnMiddleware];
							let done = 0;
							next();
							function next(err?: functions.https.HttpsError | any) {
								// error handling
								if (err) {
									if (err instanceof functions.https.HttpsError) {
										throw err;
									} else {
										throw new functions.https.HttpsError('unknown', 'An unknown error has occured.');
									}
								}

								if (done === middleware.length) {
									return controller[fnName](data, context);
								} else {
									middleware[done](data, context);
									done++;
								}
							}
						});
				}
			}
		}
	}
}
