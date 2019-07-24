import { FunctionsIndex } from '@decorfn/firebase/lib/src';

// import * as mongoose from 'mongoose';
import * as functions from 'firebase-functions';

// ALL MIDDLEWARE MUST RETURN A PROMISE

export class MyCallMiddleware extends FunctionsIndex {
	public connectToDb = (data: any, context: functions.https.CallableContext) => {
		// await mongoose.connect(functions.config().mongo.uri, {
		// 	useNewUrlParser: true,
		// 	autoReconnect: true
		// });

		console.log('CONNECT TO DB EXAMPLE');
	};

	public async testMiddleware2(data: any, context: functions.https.CallableContext) {
		// await mongoose.connect(functions.config().mongo.uri, {
		// 	useNewUrlParser: true,
		// 	autoReconnect: true
		// });

		console.log('TEST MIDDLEWARE2');
	}

	public testMiddleware3(data: any, context: functions.https.CallableContext): Promise<void> {
		// await mongoose.connect(functions.config().mongo.uri, {
		// 	useNewUrlParser: true,
		// 	autoReconnect: true
		// });

		console.log('TEST MIDDLEWARE3');
		return Promise.resolve();
	}
}

export const CallMiddleware = new MyCallMiddleware();
