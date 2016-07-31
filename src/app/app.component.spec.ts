/* tslint:disable:no-unused-variable */

import {
  inject,
  async,
  addProviders
} from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: SPA', () => {

  beforeEach(() => {
    addProviders([AppComponent]);
  });

  it('should create the app', inject([AppComponent], (app: AppComponent) => {
    // actual test
    expect(app).toBeTruthy();
  }));

  it('should have as title \'app works!\'', inject([AppComponent], (app: AppComponent) => {
    expect(app.title).toEqual('app works!');
  }));

});
