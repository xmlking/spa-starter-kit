import {
  inject,
  addProviders
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('Component: Home', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([HomeComponent]);
  });


  it('should inject the component', inject([HomeComponent],
      (component: HomeComponent) => {
    expect(component).toBeTruthy();
  }));

});



