import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent, MenuComponent } from '.';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MenuComponent, FooterComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    RouterModule,
    SharedModule,
  ],
  exports: [MenuComponent, FooterComponent],
})
export class NavModule {}
