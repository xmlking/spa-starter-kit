import {
  inject,
  addProviders
} from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('Component: Dashboard', () => {

  beforeEach(() => {
    addProviders([DashboardComponent]);
  });

  it('should inject the component', inject([DashboardComponent], (component: DashboardComponent) => {
    expect(component).toBeTruthy();
  }));


});


