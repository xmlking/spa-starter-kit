/* tslint:disable:no-unused-variable */

import {
  inject,
  async,
  addProviders
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { APP_ROUTER_PROVIDERS } from '../../index';
import { provide } from '@angular/core';
import { HeroesComponent } from './heroes.component';
import { HeroesService } from './shared/services/heroes.service';
export class MockRouter {
  public events = new Subject();
  public navigate(commands: any[]) {
  }

}

describe('Component: Heroes', () => {

  beforeEach(() => {
    addProviders([HeroesComponent]);
    addProviders([HeroesService]);
    addProviders(APP_ROUTER_PROVIDERS);
    addProviders([provide(Router, {useValue: new MockRouter()})]);
  });

  it('should create an instance', inject([HeroesComponent], (comp: HeroesComponent) => {
    // actual test
    expect(comp).toBeTruthy();
  }));

});
