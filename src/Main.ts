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
            let cPrototype = Object.getPrototypeOf(controller);

            for (let fn in controller) {
                let fnPrototype = Object.getPrototypeOf(controller[fn]);
                console.log(fnPrototype);
                console.log(cPrototype);

                if (fnPrototype.options.type === 'onCall') {
                    exports[
                        controller.constructor.name + '_' + fnPrototype.fnName
                    ] = functions
                        .region(fnPrototype.options.region)
                        .https.onCall(
                            (
                                data: any,
                                context: functions.https.CallableContext
                            ) => {
                                let middleware = [
                                    ...cPrototype[ClassKeys.CallMiddleware],
                                    ...fnPrototype[ClassKeys.CallMiddleware]
                                ];
                                let done = 0;
                                next();
                                function next(
                                    err?: functions.https.HttpsError | any
                                ) {
                                    // error handling
                                    if (err) {
                                        if (
                                            err instanceof
                                            functions.https.HttpsError
                                        ) {
                                            throw err;
                                        } else {
                                            throw new functions.https.HttpsError(
                                                'unknown',
                                                'An unknown error has occured.'
                                            );
                                        }
                                    }

                                    if (done === middleware.length) {
                                        return controller[fnPrototype.fnName](
                                            data,
                                            context
                                        );
                                    } else {
                                        middleware[done](data, context);
                                        done++;
                                    }
                                }
                            }
                        );
                }
            }
        }
    }
}
