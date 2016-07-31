import {
  inject,
  async,
  addProviders
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { APP_ROUTER_PROVIDERS } from '../../../index';

export class MockRouter {

  public events = new Subject();

  public navigate(commands: any[]) {
  }

}

describe('Component: Executives', () => {

  beforeEach(() => {
    addProviders([NavbarComponent]);
    addProviders(APP_ROUTER_PROVIDERS);
    addProviders([provide(Router, {useValue: new MockRouter()})]);
  });

  it('should create an instance', inject([NavbarComponent], (comp: NavbarComponent) => {
    // actual test
    expect(comp).toBeTruthy();
  }));

  // describe('.handle', () => {
  //   it('handles 401 response', () => {
  //     errorHandler.handle({status: 401});
  //     expect(loginService.logout).toHaveBeenCalled();
  //     expect(router.navigate).toHaveBeenCalledWith(['login']);
  //   });
  //
  //   it('does not handle other errors', () => {
  //     errorHandler.handle({status: 400});
  //     expect(loginService.logout).not.toHaveBeenCalled();
  //     expect(router.navigate).not.toHaveBeenCalled();
  //   });
  // }); // .handle

});
