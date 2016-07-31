

import {
  inject,
  async,
  addProviders
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesService } from '../../services/heroes.service';
import {ActivatedRoute} from '@angular/router';
import { APP_ROUTER_PROVIDERS } from '../../../../../index';

class MockActivatedRoute {}

describe('Component: HeroDetail', () => {

  beforeEach(() => {
    addProviders([HeroDetailComponent]);
    addProviders([HeroesService]);
    addProviders(APP_ROUTER_PROVIDERS);
    addProviders([provide(ActivatedRoute, {useValue: new MockActivatedRoute()})]);
  });

  it('should create an instance', inject([HeroDetailComponent], (comp: HeroDetailComponent) => {
    // actual test
    expect(comp).toBeTruthy();
  }));

});
