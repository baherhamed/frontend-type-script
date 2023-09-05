/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public toastr: ToastrService) {}

  success(message: any): void {
    this.toastr.success(message);
  }

  error(message: any): void {
    this.toastr.error(message);
  }

  info(message: any): void {
    this.toastr.info(message);
  }

  warning(message: any): void {
    this.toastr.warning(message);
  }
}
