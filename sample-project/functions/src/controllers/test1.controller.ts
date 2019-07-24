import {
    FireFunction,
    FunctionsIndex,
    CallMiddleware
} from '@decorfn/firebase';
import * as functions from 'firebase-functions';

export class FirstTestController extends FunctionsIndex {
    // OUR DECORATOR FOR CLASSES
    @FireFunction({
        region: 'europe-west1',
        type: 'onCall'
    })
    // THE NAME OF THE FUNCTION INSIDE YOUR CALL MIDDLEWARE CLASS AS STRING -- ONLY WAY I COULD GET IT TO WORK FOR NOW
    @CallMiddleware(['connectToDb'])
    functionOne(data: any, context: functions.https.CallableContext) {
        console.log('DOING FUNCTION ONE FROM FIRST TEST CONTROLLER');
    }

    @FireFunction({
        region: 'europe-west1',
        type: 'onCall'
    })
    functionTwo(data: any, context: functions.https.CallableContext) {
        console.log('DOING FUNCTION TWO FROM FIRST TEST CONTROLLER');
    }
}
