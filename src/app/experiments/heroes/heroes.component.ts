import { Component, OnInit } from '@angular/core';
import {  Router, ROUTER_DIRECTIVES } from '@angular/router';
import {HeroService} from './shared/services/HeroService';
import { Hero } from './shared/models/Hero';


@Component({
  moduleId: module.id,
  selector: 'air-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  providers:  [HeroService],
  directives: [ROUTER_DIRECTIVES]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService
  ) { }

  getHeroes():void {
    this.heroService.getHeroes().then((heroes:Hero[]) => this.heroes = heroes);
  }

  ngOnInit():void {
    this.getHeroes();
  }

  onSelect(hero: Hero):void { this.selectedHero = hero; }

}
