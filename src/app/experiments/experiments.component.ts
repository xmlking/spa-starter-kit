import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-experiments',
  templateUrl: 'experiments.component.html',
  styleUrls: ['experiments.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ExperimentsComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
