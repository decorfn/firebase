import * as functions from 'firebase-functions';
import { MethodOptions } from './decorators';

interface fni {
	[key: string]: any;
}

export class FunctionsIndex implements fni {
	[key: string]: any;
}

class Controller extends FunctionsIndex {}
export type IController = Controller;

// export class Main {
// 	public controllers: IController[] = [];
// 	public reqMiddleware: any;
// 	public callMiddleware: any;

// 	public start() {
// 		for (let controller of this.controllers) {
// 			let prot = Object.getPrototypeOf(controller);
// 			let methods = Object.getOwnPropertyNames(prot);
// 			for (let fn of methods) {
// 				if (fn === 'constructor') {
// 					//
// 				} else {
// 					let options: MethodOptions = Object.getPrototypeOf(controller[fn]).options;
// 					let cName: string = controller.constructor.name;
// 					if (options.type === 'onCall') {
// 						exports[
// 							cName.charAt(0).toLowerCase() + cName.slice(1) + fn.charAt(0).toUpperCase() + fn.slice(1)
// 						] = functions
// 							.region(options.region)
// 							.https.onCall(async (data: any, context: functions.https.CallableContext) => {
// 								try {
// 									if (options.callMiddleware && options.callMiddleware.length > 0) {
// 										for (let middleware of options.callMiddleware) {
// 											await this.callMiddleware[middleware.constructor.name](data, context);
// 										}
// 									}
// 									return controller[fn](data, context);
// 								} catch (err) {
// 									console.log(err);
// 									throw new functions.https.HttpsError('unknown', 'An uknown error has occured');
// 								}
// 							});
// 					}
// 				}
// 			}
// 		}
// 	}
// }

export function start(controllers: IController[], MyCallMiddlewareClass?: any) {
	for (let controller of controllers) {
		let prot = Object.getPrototypeOf(controller);
		let methods = Object.getOwnPropertyNames(prot);
		for (let fn of methods) {
			if (fn === 'constructor') {
				//
			} else {
				let options: MethodOptions = Object.getPrototypeOf(controller[fn]).options;
				let middleware = Object.getPrototypeOf(controller[fn]).middleware;
				let cName: string = controller.constructor.name;
				if (options.type === 'onCall') {
					exports[
						cName.charAt(0).toLowerCase() +
							cName.slice(1) +
							'_' +
							fn.charAt(0).toUpperCase() +
							fn.slice(1)
					] = functions
						.region(options.region)
						.https.onCall(async (data: any, context: functions.https.CallableContext) => {
							try {
								console.log(middleware);
								if (middleware && middleware.length > 0) {
									for (let midfn of middleware) {
										console.log(midfn);
										await MyCallMiddlewareClass[midfn](data, context);
									}
								}
								// RUN GLOBAL STUFF FOR YOUR CALL FUNCTIONS  -- LIKE CALLING A DB FROM HERE.
								return controller[fn](data, context);
							} catch (err) {
								console.log(err);
								throw new functions.https.HttpsError('unknown', 'An uknown error has occured');
							}
						});
				}
			}
		}
	}
}
