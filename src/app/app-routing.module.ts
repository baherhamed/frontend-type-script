import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/',
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then(
        (module) => module.SecurityModule
      ),
  },
  {
    path: 'systemManagement',
    loadChildren: () =>
      import('./system-management/system-management.module').then(
        (module) => module.SystemManagementModule
      ),
  },
  // {
  //   path: 'systemManagement',
  //   loadChildren: () =>
  //     import('./system-management/system-management.module').then(
  //       (module) => module.SystemManagementModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
