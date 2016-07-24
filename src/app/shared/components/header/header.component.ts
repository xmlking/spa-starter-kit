import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/'
@Component({
  moduleId: module.id,
  selector: 'header[air-header]',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [NavbarComponent]
})
export class HeaderComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
