import {Component} from 'angular2/core';
import {Alert} from 'ng2-bootstrap';

@Component({
  selector: 'app',
  providers: [],
  //templateUrl:   require('file!./app.html'),
  template:  require('./app.html'),
  directives: [Alert],
  pipes: []
})
export class App {
  defaultMeaning: number = 42;

  meaningOfLife(meaning: String): String {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
