import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyRouteComponent } from './components';

const routes: Routes = [
  { path: '', loadChildren: () => import('./routes').then(m => m.HomeModule), data: { title: 'DEV' } },
  { path: 'dev', loadChildren: () => import('./routes').then(m => m.DevModule), data: { title: 'DEV' } },
  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/ng-sub' }]
})
export class AppRoutingModule { }
