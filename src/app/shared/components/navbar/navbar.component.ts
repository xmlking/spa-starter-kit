import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

@Component({
  moduleId: module.id,
  selector: 'nav[air-navbar]',
  host:     { 'class': 'navbar navbar-default navbar-fixed-top' },
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES, CollapseDirective]
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean = true;

  constructor(public router: Router) {}

  ngOnInit() {
  }

}
