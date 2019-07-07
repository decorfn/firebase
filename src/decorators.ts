import * as functions from 'firebase-functions';
import 'reflect-metadata';

export type WrapperFunction = (action: any) => any;
type Middleware = any;
export type NextFunction = (err?: any) => {};
export enum ClassKeys {
    BasePath = 'BASE_PATH',
    // MIDDLEWARE
    RequestMiddleware = 'REQUESMIDDLEWARE',
    CallMiddleware = 'CALLMIDDLEWARE',
    // WRAPPERS
    Wrapper = 'WRAPPER',
    RequestWrapper = 'REQUESTWRAPPER',
    CallWrapper = 'CALLWRAPPER',
    // OPTIONS
    Options = 'OPTIONS'
}

export interface MethodOptions {
    region: string;
    type: 'onCall' | 'onRequest';
}

export type CallMiddleware = (
    data: any,
    context: functions.https.CallableContext,
    next: NextFunction
) => void;

/***********************************************************************************************
 *                                      Method Decorators
 **********************************************************************************************/
/**
 * @param region The region of your function, for example: 'europe-west1'
 * @param type can be onCall or onRequest
 */
export function FireFunction(options: MethodOptions): MethodDecorator {
    return (target: object | any, key: string | symbol) => {
        Reflect.defineMetadata(ClassKeys.Options, options, target.prototype);
        Reflect.defineMetadata('fnName', key as string, target.prototype);
    };
}

/***********************************************************************************************
 *                                 Class Wrapper Decorator
 **********************************************************************************************/
export function ClassCallWrapper(
    wrapperFunction: WrapperFunction
): ClassDecorator {
    // tslint:disable-next-line:ban-types
    return <TFunction extends Function>(target: TFunction) => {
        Reflect.defineMetadata(
            ClassKeys.CallWrapper,
            wrapperFunction,
            target.prototype
        );
        return target;
    };
}

export function ClassRequestWrapper(
    wrapperFunction: WrapperFunction
): ClassDecorator {
    // tslint:disable-next-line:ban-types
    return <TFunction extends Function>(target: TFunction) => {
        Reflect.defineMetadata(
            ClassKeys.RequestWrapper,
            wrapperFunction,
            target.prototype
        );
        return target;
    };
}

/***********************************************************************************************
 *                                  Class Middleware Decorators
 **********************************************************************************************/

export function ClassMiddleware(middleware: Middleware[]): ClassDecorator {
    // tslint:disable-next-line:ban-types
    return <TFunction extends Function>(target: TFunction) => {
        Reflect.defineMetadata(
            ClassKeys.RequestMiddleware,
            middleware,
            target.prototype
        );
        return target;
    };
}

export function ClassCallMiddleware(
    middleware: CallMiddleware[]
): ClassDecorator {
    // tslint:disable-next-line:ban-types
    return <TFunction extends Function>(target: TFunction) => {
        Reflect.defineMetadata(
            ClassKeys.CallMiddleware,
            middleware,
            target.prototype
        );
        return target;
    };
}

/***********************************************************************************************
 *                                  Middleware Decorator
 **********************************************************************************************/

export function RequestMiddleware(middleware: Middleware[]): MethodDecorator {
    return (target: object | any, key: string | symbol) => {
        Reflect.defineMetadata(
            ClassKeys.RequestMiddleware,
            middleware,
            target.prototype
        );
    };
}

export function CallMiddleware(middleware: CallMiddleware[]): MethodDecorator {
    return (target: object | any, key: string | symbol) => {
        Reflect.defineMetadata(
            ClassKeys.CallMiddleware,
            middleware,
            target.prototype
        );
    };
}

/***********************************************************************************************
 *                                  Wrapper Decorator
 **********************************************************************************************/

export function Wrapper(wrapperFunction: WrapperFunction) {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor?: PropertyDescriptor
    ) => {
        return (target: object | any, key: string | symbol) => {
            Reflect.defineMetadata(
                ClassKeys.CallMiddleware,
                wrapperFunction,
                target.prototype
            );
        };
    };
}
