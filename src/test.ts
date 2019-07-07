import * as functions from 'firebase-functions';
import { RequestHandler } from '../sample-project/functions/node_modules/@types/express';
import { Controller } from './Main';
// import Reflect from 'reflect-metadata';
import 'reflect-metadata';
type Middleware = RequestHandler;
import { Request, Response, NextFunction } from 'express';

/** @middleware  Used to check if a user is a thames labs super-admin */
export function mp01_checkSuperAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let isAllowed = true;
    if (isAllowed) {
        next();
    } else {
        let err = new Error();
        err.name = 'permissions';
        next(err);
    }
}

export enum ClassKeys {
    BasePath = 'BASE_PATH',
    Middleware = 'MIDDLEWARE',
    Wrapper = 'WRAPPER',
    Children = 'CHILDREN',
    Options = 'OPTIONS'
}

export function TestDecorator(
    region: string,
    type: 'onCall' | 'onRequest'
): MethodDecorator {
    return (target: any, key: string | symbol, descriptor: any) => {
        Object.getPrototypeOf(target[key]).region = region;
        Object.getPrototypeOf(target[key]).type = type;
        Object.getPrototypeOf(target[key]).fnName = key as string;
    };
}

interface TestIndex {
    [key: string]: any;
}

export function ClassMiddleware(middleware: Middleware[]): ClassDecorator {
    // tslint:disable-next-line:ban-types
    return <TFunction extends Function>(target: TFunction) => {
        Reflect.defineMetadata(
            ClassKeys.Middleware,
            middleware,
            target.prototype
        );
        return target;
    };
}

@ClassMiddleware([mp01_checkSuperAdmin])
export class TestController {
    @TestDecorator('europe-west1', 'onCall')
    TestMethod() {}
}

export class TestMain {
    theTest = new TestController();

    run() {
        let proto = Object.getPrototypeOf(this.theTest);
        let middle = Reflect.getOwnMetadata(ClassKeys.Middleware, proto);
        console.log(middle);
    }
}

let Main = new TestMain();
Main.run();
