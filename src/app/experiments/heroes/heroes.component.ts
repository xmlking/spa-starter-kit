import { Component, OnInit } from '@angular/core';
import {  Router, ROUTER_DIRECTIVES } from '@angular/router';
import {HeroesService} from './shared/services/heroes.service';
import { Hero } from './shared/models/Hero';


@Component({
  moduleId: module.id,
  selector: 'air-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  providers:  [HeroesService],
  directives: [ROUTER_DIRECTIVES]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroesService: HeroesService
  ) { }

  getHeroes():void {
    this.heroesService.getHeroes().then((heroes:Hero[]) => this.heroes = heroes);
  }

  ngOnInit():void {
    this.getHeroes();
  }

  onSelect(hero: Hero):void { this.selectedHero = hero; }

}
