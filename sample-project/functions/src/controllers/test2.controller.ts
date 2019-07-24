import {
    FireFunction,
    FunctionsIndex,
    CallMiddleware
} from '@decorfn/firebase';
import * as functions from 'firebase-functions';

export class SecondTestController extends FunctionsIndex {
    @FireFunction({
        region: 'europe-west1',
        type: 'onCall'
    })
    @CallMiddleware(['connectToDb', 'Test2'])
    functionOne(data: any, context: functions.https.CallableContext) {
        console.log('DOING FUNCTION ONE FROM SECOND TEST CONTROLLER');
    }

    @FireFunction({
        region: 'europe-west1',
        type: 'onCall'
    })
    functionTwo(data: any, context: functions.https.CallableContext) {
        console.log('DOING FUNCTION TWO FROM SECOND TEST CONTROLLER');
    }
}
