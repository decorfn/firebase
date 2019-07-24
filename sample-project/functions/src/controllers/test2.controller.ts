import { FireFunction, FunctionsIndex } from '@decorfn/firebase/lib/src';
// import { CallMiddleware } from '../call.middleware';
import * as functions from 'firebase-functions';

export class SecondTestController extends FunctionsIndex {
	@FireFunction({
		region: 'europe-west1',
		type: 'onCall'
		//	callMiddleware: [CallMiddleware.connectToDb, CallMiddleware.testMiddleware2]
	})
	functionOne(data: any, context: functions.https.CallableContext) {
		console.log('DOING FUNCTION ONE FROM SECOND TEST CONTROLLER');
	}

	@FireFunction({
		region: 'europe-west1',
		type: 'onCall'
		//		callMiddleware: [CallMiddleware.connectToDb, CallMiddleware.testMiddleware3]
	})
	functionTwo(data: any, context: functions.https.CallableContext) {
		console.log('DOING FUNCTION TWO FROM SECOND TEST CONTROLLER');
	}
}
