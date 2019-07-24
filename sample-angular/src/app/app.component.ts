import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  result: any;
  title = 'sample-angular';

  constructor(private aff: AngularFireFunctions) {}

  testFunction1() {
    let call = this.aff.httpsCallable('firstTestController_FunctionOne');
    call({ test: 'test' }).subscribe(data => {
      this.result = data;
    });
  }
}
