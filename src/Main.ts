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

export function start(controllers: IController[], middleClass?: any) {
    for (let controller of controllers) {
        let prot = Object.getPrototypeOf(controller);
        let methods = Object.getOwnPropertyNames(prot);
        for (let fn of methods) {
            if (fn === 'constructor') {
                //
            } else {
                let options: MethodOptions = Object.getPrototypeOf(
                    controller[fn]
                ).options;
                let middleware = Object.getPrototypeOf(controller[fn])
                    .middleware;
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
                        .https.onCall(
                            async (
                                data: any,
                                context: functions.https.CallableContext
                            ) => {
                                try {
                                    if (
                                        middleware &&
                                        middleware.length > 0 &&
                                        middleClass
                                    ) {
                                        let myMiddle = new middleClass();
                                        for (let midfn of middleware) {
                                            await myMiddle[midfn](
                                                data,
                                                context
                                            );
                                        }
                                    }
                                    return controller[fn](data, context);
                                } catch (err) {
                                    console.log(err);
                                    throw new functions.https.HttpsError(
                                        'unknown',
                                        'An uknown error has occured'
                                    );
                                }
                            }
                        );
                }
            }
        }
    }
}
