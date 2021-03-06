import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
// pages
import {MainPageComponent} from './main-page/main-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'main',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: MainPageComponent},
      {path: 'about', component: AboutPageComponent},
      {path: '**', component: PageNotFoundComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
