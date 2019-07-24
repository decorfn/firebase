import { IController, MethodOptions } from '@decorfn/firebase/lib/src';
import { CallMiddleware } from './call.middleware';
import { SecondTestController } from './controllers/test2.controller';
import { FirstTestController } from './controllers/test1.controller';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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

const firstController = new FirstTestController();
const secondController = new SecondTestController();
admin.initializeApp();
start([firstController, secondController], CallMiddleware);
