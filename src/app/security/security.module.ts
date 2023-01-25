import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent, RoutesComponent, UsersComponent } from '.';

@NgModule({
  declarations: [LoginComponent, UsersComponent, RoutesComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    TranslateModule,
    MaterialModule,
    ToastrModule,
    SharedModule,
  ],
})
export class SecurityModule {}
