import {
  inject,
  addProviders
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { FooterComponent } from './footer.component';

describe('Component: Footer', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([FooterComponent]);
  });


  it('should inject the component', inject([FooterComponent],
      (component: FooterComponent) => {
    expect(component).toBeTruthy();
  }));


});


