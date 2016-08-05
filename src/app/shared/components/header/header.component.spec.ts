import {
  inject,
  addProviders
} from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('Component: Header', () => {


  beforeEach(() => {
    addProviders([HeaderComponent]);
  });

  it('should inject the component', inject([HeaderComponent],
      (component: HeaderComponent) => {
    expect(component).toBeTruthy();
  }));

});

