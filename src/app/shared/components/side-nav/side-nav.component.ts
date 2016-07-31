import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SideNavComponent {
  public components: Array<string> = [
    'Accordion',
    'Alert',
    'Buttons',
    'Carousel',
    'Collapse',
    'Dropdown',
    'Pager',
    'Pagination',
    'Popover',
    'Progressbar',
    'Rating',
    'Tabs',
    'Tooltip'
  ]
}
