import { Component, OnInit } from '@angular/core';
import { MeService } from "../services/me.service";
import { Pool } from "../models/pool";
import { MatDialog } from '@angular/material';
import { TurnData, MyTurnDialogComponent } from "./my-turn-dialog/my-turn-dialog.component";

@Component({
  selector: 'app-turn-component',
  templateUrl: './turn-component.component.html',
  styleUrls: ['./turn-component.component.scss']
})
export class TurnComponentComponent implements OnInit {
  constructor(public dialog: MatDialog, private meService: MeService) { }
  private _isMyTurn: boolean;
  private _wasMyTurn: boolean;
  private _round: number;
  

  ngOnInit() {    
    this._isMyTurn = false;
    this._round = 0;

    this.meService.isMyTurn.subscribe(isMyTurn => {
      this._wasMyTurn = this._isMyTurn;
      this._isMyTurn = isMyTurn;
    });
    this.meService.poolChanged.subscribe(this.setInfo);
  }

  openDialog(): void {
    const turnData: TurnData = { round: this._round };
    this.dialog.open(MyTurnDialogComponent, {
      width: '500px',
      data: turnData
    });
  }

  private setInfo = (pool: Pool) => {
    this._round = pool.round;
    
    if (!this._wasMyTurn && this._isMyTurn) {
      this.openDialog();
    }
  }
}
