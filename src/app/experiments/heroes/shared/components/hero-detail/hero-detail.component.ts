import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { Hero } from './../../models/Hero';
import { HeroService } from './../../services/HeroService';

@Component({
  moduleId: module.id,
  selector: 'air-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css'],
  providers:  [HeroService],
  directives: [ROUTER_DIRECTIVES]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  private sub: any;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit():void {
    this.sub = this.route.params.subscribe(params => {
      let id:number = params['id'];
      this.heroService.getHero(id)
        .then((hero:Hero) => {
          this.hero = hero;
          console.log("hero: ",hero)
        });
    });
  }

  goBack():void {
    window.history.back();
  }
}
