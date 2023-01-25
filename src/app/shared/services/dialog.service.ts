import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  showDetails(templateRef: any) {
    this.dialog.open(templateRef, {

    });


  }
}
