import { Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { About } from './about/about';
import { Game } from './game/game';

export const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: Menu },
  { path: 'about', component: About },
  { path: 'game', component: Game },
];
