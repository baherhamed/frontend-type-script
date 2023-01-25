import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PaginatorComponent, SpinnerComponent } from '.';

@NgModule({
  declarations: [PaginatorComponent, SpinnerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PaginatorComponent, SpinnerComponent],
})
export class SharedModule {}
