import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewEncapsulation } from "@angular/core";

export interface TurnData {
  round: number;
}

@Component({
  selector: 'app-my-turn-dialog',
  templateUrl: './my-turn-dialog.component.html',
  styleUrls: ['./my-turn-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyTurnDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MyTurnDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TurnData) {}

  templateNumber: number;

  ngOnInit() {
    this.templateNumber = this.generateTemplateNumber();
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  generateTemplateNumber() {
    return this.random(1, 4);
  }

  private random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
