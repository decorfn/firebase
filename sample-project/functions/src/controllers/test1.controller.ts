import { FireFunction, FunctionsIndex } from '@decorfn/firebase/lib/src';
import * as functions from 'firebase-functions';

export class FirstTestController extends FunctionsIndex {
	@FireFunction({
		region: 'europe-west1',
		type: 'onCall',
		callMiddleware: ['connectToDb', 'testMiddleware2']
	})
	functionOne(data: any, context: functions.https.CallableContext) {
		console.log('DOING FUNCTION ONE FROM FIRST TEST CONTROLLER');
	}

	@FireFunction({
		region: 'europe-west1',
		type: 'onCall'
		// callMiddleware: [CallMiddleware.connectToDb, CallMiddleware.testMiddleware2()]
	})
	functionTwo(data: any, context: functions.https.CallableContext) {
		console.log('DOING FUNCTION TWO FROM FIRST TEST CONTROLLER');
	}
}
