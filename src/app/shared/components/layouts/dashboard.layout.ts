import {Component, Input, OnInit} from '@angular/core';
import {SideNavComponent} from '../side-nav';

@Component({
  moduleId: module.id,
  selector: 'div[app-dashboard-layout]',
  directives: [SideNavComponent],
  templateUrl: 'dashboard.layout.html',
  styleUrls: ['dashboard.layout.css']
})
export class DashboardLayout implements OnInit {

  @Input()
  public title: string;

  constructor() {}

  ngOnInit() {
  }

}
