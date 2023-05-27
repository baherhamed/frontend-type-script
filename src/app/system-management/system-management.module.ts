import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { CitiesComponent, GovsComponent } from '.';
import { SystemManagementRoutingModule } from './system-management-routing.module';

@NgModule({
  declarations: [GovsComponent, CitiesComponent],
  imports: [
    CommonModule,
    SystemManagementRoutingModule,
    FormsModule,
    TranslateModule,
    MaterialModule,
    ToastrModule,
    SharedModule,
  ],
})
export class SystemManagementModule {}
