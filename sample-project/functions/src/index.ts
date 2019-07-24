import { IController, MethodOptions } from '@decorfn/firebase';
import { MyCallMiddleware } from './call.middleware';
import { SecondTestController } from './controllers/test2.controller';
import { FirstTestController } from './controllers/test1.controller';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// MAIN FUNCTION
export function start(controllers: IController[], middleClass?: any) {
    // ADDING CONTROLLER CLASSES AS PARAMETER AND LOOPING OVER EACH CONTROLLER
    for (let controller of controllers) {
        // GETTING PROTOTYPE OF CONTROLLER, CLASS MIDDLEWARE WILL BE A THING IN THE FUTURE
        let prot = Object.getPrototypeOf(controller);

        // GETTING ALL METHODS/FUNCTIONS OF THAT CONTROLLER
        let methods = Object.getOwnPropertyNames(prot);

        // THE LOOP THAT EXPORTS YOUR CLASS METHODS AS FIREBASE FUNCTIONS
        for (let fn of methods) {
            // THE CONSTRUCTOR IS COUNTED AS A METHOD SO WE NEED TO DITCH THAT HERE
            if (fn === 'constructor') {
                //
            } else {
                // GETTING THE OPTIONS WE SAVED ON THE FUNCTION PROTOTYPE WITH THE @FireFunction DECORATOR
                let options: MethodOptions = Object.getPrototypeOf(
                    controller[fn]
                ).options;

                // GETTING THE MIDDLEWARE WE SAVED ON THE FUNCTION PROTOTY WITH THE @CallMiddleware DECORATOR
                let middleware = Object.getPrototypeOf(controller[fn])
                    .middleware;

                // GETTING THE CONTROLLER NAME SO WE CAN NAME OUR FIREBASE FUNCTIONS BASED ON THAT
                let cName: string = controller.constructor.name;

                // CURRENTLY JUST FOCUSING ON THE ONCALL FUNCTIONS
                if (options.type === 'onCall') {
                    // WE NAME EACH FUNCTION HERE USING CAMELCASE, ENDS UP BEING:  className_FunctionName
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
                                // INSIDE EACH FUNCTION, WE WRAP EVERYTHING IN A GENERIC TRY CATCH WITH DEFAULT ERROR
                                try {
                                    // CHECKING IF WE HAVE STUFF IN THE MIDDLEWARE ARRAY + MIDDLEWARE CLASS PARAM
                                    if (
                                        middleware &&
                                        middleware.length > 0 &&
                                        middleClass
                                    ) {
                                        // CREATING AN OBJECT BASED ON PASSED MIDDLEWARE CLASS
                                        let myMiddle = new middleClass();

                                        // FOR LOOP TO AWAIT EACH MIDDLEWARE
                                        for (let midfn of middleware) {
                                            await myMiddle[midfn](
                                                data,
                                                context
                                            );
                                        }
                                    }
                                    // ONCE WE AWAITED ALL MIDDLEWARE, WE CALL OUR ACTUAL FUNCTION LOGIC
                                    return controller[fn](data, context);
                                } catch (err) {
                                    // WE LOG THE DEFAULT ERROR ON THE CONSOLE
                                    console.log(err);
                                    // THROWING THE ERROR THE WAY FIREBASE WANTS IT
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

// CREATING OUR CONTROLLER OBJECTS
const firstController = new FirstTestController();
const secondController = new SecondTestController();
// INITIALIZING ADMIN APP
admin.initializeApp();

// PASSING THE CONTROLLERS AS ARRAYS + THE OPTIONAL MIDDLEWARE CLASS TO OUR START LOOP
start([firstController, secondController], MyCallMiddleware);
