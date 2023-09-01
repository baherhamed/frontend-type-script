import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private scrollStrategyOptions: ScrollStrategyOptions
  ) {}

  showAdd(templateRef: any) {
    this.dialog.open(templateRef, {
      // enterAnimationDuration: 50,
      // exitAnimationDuration: 50,
      autoFocus: true,
      width: '90vw',
      maxWidth: '100vw',
      position: { top: '5vh', bottom: '25vh' },
      disableClose: true,

      // panelClass: ['animate__animated', 'animate__slideInDown'],
    });
  }
  // animate__fadeIn
  // animate__fadeOut
  // animate__slideInRight
  // animate__slideInLeft
  // animate__slideInCenter
  // animate__slideOutCenter
  showUpdate(templateRef: any) {
    this.dialog.open(templateRef, {
      // enterAnimationDuration: 50,
      // exitAnimationDuration: 20,
      autoFocus: true,
      width: '90vw',
      maxWidth: '100vw',
      maxHeight: '80vh',
      // scrollStrategy: this.scrollStrategyOptions.block(),
      position: { top: '5vh', bottom: '25vh' },
      disableClose: true,
      // panelClass: ['animate__animated', 'animate__slideInUp'],
      // ariaModal: true,
    });
  }
  showSearch(templateRef: any) {
    this.dialog.open(templateRef, {
      // enterAnimationDuration: 50,
      // exitAnimationDuration: 20,
      autoFocus: true,
      width: '90vw',
      maxWidth: '100vw',
      maxHeight: '80vh',
      // scrollStrategy: this.scrollStrategyOptions.block(),
      position: { top: '5vh', bottom: '25vh' },
      disableClose: true,
      // panelClass: ['animate__animated', 'animate__fadeIn'],
      ariaModal: true,
    });
  }

  showDetails(templateRef: any) {
    this.dialog.open(templateRef, {
      autoFocus: true,
      width: '90vw',
      maxWidth: '100vw',
      maxHeight: '80vh',
      position: { top: '5vh', bottom: '25vh' },
      disableClose: true,
      ariaModal: true,
    });
  }
}
