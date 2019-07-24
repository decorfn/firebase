import * as functions from 'firebase-functions';
/***********************************************************************************************
 *                                      Method Decorators
 **********************************************************************************************/
/**
 * @param region The region of your function, for example: 'europe-west1'
 * @param type can be onCall or onRequest
 */
export declare type MethodOptions = {
    region: string;
    type: 'onCall' | 'onRequest';
};
export declare function FireFunction(options: MethodOptions): MethodDecorator;
export declare function CallMiddleware(middleware: string[]): (target: any, key: string | symbol) => void;
export interface Index {
    [key: string]: any;
}
export declare type Context = functions.https.CallableContext;
