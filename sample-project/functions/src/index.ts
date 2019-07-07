import * as functions from 'firebase-functions';
import { Controller, Main } from '../../../lib/src/Main';
import {
    ClassCallMiddleware,
    CallMiddleware,
    NextFunction
} from '../../../lib/src/decorators';

const callMid1: CallMiddleware = (
    data: any,
    context: functions.https.CallableContext,
    next: NextFunction
) => {
    console.log('CALL MID 1');
    data.callMid1 = true;
    next();
};

const callMid2: CallMiddleware = (
    data: any,
    context: functions.https.CallableContext,
    next: NextFunction
) => {
    console.log('CALL MID 2');
    data.callMid2 = true;
    next();
};

const callMid3: CallMiddleware = (
    data: any,
    context: functions.https.CallableContext,
    next: NextFunction
) => {
    console.log('CALL MID 3');
    data.callMid3 = true;
    next();
};

@ClassCallMiddleware([callMid1])
export class TestController implements Controller {
    @CallMiddleware([callMid2, callMid3])
    TestMethod(data: any, context: functions.https.CallableContext) {
        console.log(data);
        console.log('THIS IS THE ACUTAL METHOD');
    }
}

export class TestMain extends Main {
    theTest = new TestController();
    constructor() {
        super();
        this.controllers = [this.theTest];
    }

    run() {
        this.start();
    }
}

let functionsApp = new TestMain();
functionsApp.run();
