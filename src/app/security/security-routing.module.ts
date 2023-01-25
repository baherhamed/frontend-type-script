import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LoginComponent,
  RoutesComponent,
  SecuritRoutes,
  UsersComponent,
} from '.';
import { AuthGuard } from '../shared';

const routes: Routes = [
  { path: SecuritRoutes.login.name, component: LoginComponent },
  {
    path: SecuritRoutes.users.name,
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: SecuritRoutes.routes.name,
    component: RoutesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
