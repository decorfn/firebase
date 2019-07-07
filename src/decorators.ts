import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
/***********************************************************************************************
 *                                      Method Decorators
 **********************************************************************************************/
/** Returns a functions.region(region).https.onCall((req, res) => { // old function}) */
export function OnCall(region: string): MethodDecorator {
    return (target: any, key: any) => {
        const old = target[key];
        target[key] = functions
            .region(region)
            .https.onCall(
                (data: any, context: functions.https.CallableContext) => {
                    old(data, context);
                }
            );
    };
}

/** Returns a functions.region(region).https.onRequest((req, res) => { // old function}) */
export function OnRequest(region: string): MethodDecorator {
    return (target: any, key: any) => {
        const old = target[key];
        target[key] = functions
            .region(region)
            .https.onRequest((req: Request, res: Response) => {
                old(req, res);
            });
    };
}

/**
 * @param region The region of your function, for example: 'europe-west1'
 * @param type can be onCall or onRequest
 * @return adds 2 properties to your class with the functions name;
 */
export function Function(
    region: string,
    type: 'onCall' | 'onRequest'
): MethodDecorator {
    // idk how to define target's type
    return (target: object | any, key: string | symbol) => {
        target._allFunctions.push({
            key,
            region,
            type
        });
        const old: any = target[key];
    };
}
