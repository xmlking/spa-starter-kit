import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject,
  addProviders
} from '@angular/core/testing';

import {HeroesService} from './heroes.service';
import { HEROES } from './../mock/MockHeroes';

describe('HeroService', () => {

  beforeEach(function() {
    addProviders([HeroesService]);
  });

  it('should have name property set', inject( [HeroesService], (api: HeroesService) => {
    api.getHeroes().then((hs) => {
      expect(hs).toBe(HEROES);
    });
  }))
});

