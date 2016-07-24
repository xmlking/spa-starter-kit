import { HomeComponent }     from './home.component';
import { DashboardComponent }     from '../+dashboard/dashboard.component';
import { AboutComponent }     from '../+about/about.component';
import {RouterConfig} from "@angular/router";


export const HomeRoutes : RouterConfig = [
  { path: '', redirectTo: '/home', terminal: true},
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent }
];

