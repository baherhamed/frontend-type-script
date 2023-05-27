import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared';
import { SystemManagementRoutes, GovsComponent, CitiesComponent } from '.';

const routes: Routes = [
  {
    path: SystemManagementRoutes.govs.name,
    component: GovsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: SystemManagementRoutes.cities.name,
    component: CitiesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemManagementRoutingModule {}
