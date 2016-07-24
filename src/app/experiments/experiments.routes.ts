import { ExperimentsComponent } from './experiments.component';
import { HeroesComponent, HeroDetailComponent } from './heroes/';
import {RouterConfig} from "@angular/router";

export const ExperimentsRoutes : RouterConfig = [
  { path: 'experiments', component: ExperimentsComponent},
  { path: 'heroes',
    children: [
      { path: '', component: HeroesComponent },
      { path: ':id',  component: HeroDetailComponent }
    ]
  }
];
