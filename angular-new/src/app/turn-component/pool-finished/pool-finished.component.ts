import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-pool-finished',
  templateUrl: './pool-finished.component.html',
  styleUrls: ['./pool-finished.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PoolFinishedDialogComponent {
  constructor(public dialogRef: MatDialogRef<PoolFinishedDialogComponent>) {}

  onOkClick(): void {
    this.dialogRef.close();
  }

}
