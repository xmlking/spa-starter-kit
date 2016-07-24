import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeaderComponent } from './shared/components/header/';
import { FooterComponent } from './shared/components/footer/';
import { AlertComponent } from 'ng2-bootstrap/components/alert';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES,HeaderComponent,FooterComponent,AlertComponent],
})

export class AppComponent { }
