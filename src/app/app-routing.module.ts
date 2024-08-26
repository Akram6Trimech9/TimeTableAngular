import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './config/auth.guard';
import { LoggedinGuard } from './config/loggedin.guard';

export const Approutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    pathMatch: 'full',
    canActivate:[LoggedinGuard],

  },
  // {
  //   path: 'login', t
  //   redirectTo: ''
  // },
  {
    path: '',
    component: FullComponent,
    canActivate:[LoginGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'component', loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule) }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }