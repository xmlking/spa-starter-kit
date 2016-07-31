import { Component, OnInit } from '@angular/core';
import {DashboardLayout} from '../shared/';
import {HeroesComponent} from '../experiments/heroes/';
import { CAROUSEL_DIRECTIVES } from 'ng2-bootstrap/components/carousel';

@Component({
  moduleId: module.id,
  selector: 'div[app-dashboard]',
  host: {
    class: 'container'
  },
  directives: [DashboardLayout, HeroesComponent, CAROUSEL_DIRECTIVES],
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard Works!';
  public slides:Array<any> = [];
  public slideText:Array<any> = ['Cabo San Lucas','Connect','Vancouver','Cabo San Lucas','Connect','Vancouver'];


  constructor() {}

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      this.slides.push({
        image: `assets/img/slide${i}_wide.jpg` ,
        text: this.slideText[i]
      });
    }
  }

}
