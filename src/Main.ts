export * from './decorators';
export * from './Main';
import { RequestHandler } from 'express';
import * as functions from 'firebase-functions';
import { Request, Response } from 'express';

type Middleware = RequestHandler;
type WrapperFunction = (action: any) => any;

interface FunctionsIndex {
    [key: string]: any;
}

export class Controller implements FunctionsIndex {
    [key: string]: any;
    _middleware: Middleware[] = [];
    _wrappers: WrapperFunction[] = [];
}

export class Main {
    _middleware: Middleware[] = [];
    _wrappers: WrapperFunction[] = [];
    _controllers: Controller[] = [];

    // calling it in index.ts where it will fill the file with the functions
    protected start() {
        // iterating over all controllers/classes
        for (let controller of this._controllers) {
            // making sure we're only passing our Controller class through an iterator;
            if (controller instanceof Controller) {
                for (let fn in controller) {
                    let prototype = Object.getPrototypeOf(controller[fn]);

                    if (prototype.type === 'onCall') {
                        exports[
                            controller.constructor.name + '_' + prototype.fnName
                        ] = functions
                            .region(prototype.region)
                            .https.onCall(
                                (
                                    data: any,
                                    context: functions.https.CallableContext
                                ) => {
                                    controller[fn.key](data, context);
                                }
                            );
                    }

                    if (prototype.type === 'onRequest') {
                    }

                    if (fn.type === 'onCall') {
                    }

                    if (fn.type === 'onRequest') {
                        exports[
                            controller.constructor.name + '_' + fn.key
                        ] = functions
                            .region(fn.region)
                            .https.onRequest((req: Request, res: Response) => {
                                controller[fn.key](req, res);
                            });
                    }
                }
            }
        }
    }
}

// // iterating over all methods in a controller
// for (let member in controller) {
//     // making sure we're just looking at function;
//     if (typeof member == 'function') {
//         const name =
//             controller.constructor.name +
//             '_' +
//             (member as any).prototype.name;
//         exports[name] = controller[member];
//     }
// }
