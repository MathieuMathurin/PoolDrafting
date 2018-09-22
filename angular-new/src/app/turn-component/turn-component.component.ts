import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";
import { MeService } from "../services/me.service";
import { AccountService } from "../services/account.service";
import { Pool } from "../models/pool";
import { MatDialog } from '@angular/material';
import { TurnData, MyTurnDialogComponent } from "./my-turn-dialog/my-turn-dialog.component";
import { PoolFinishedDialogComponent } from "./pool-finished/pool-finished.component";

@Component({
  selector: 'app-turn-component',
  templateUrl: './turn-component.component.html',
  styleUrls: ['./turn-component.component.scss']
})
export class TurnComponentComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog, private meService: MeService, private accountService: AccountService) { }
  private _isMyTurn = false;
  private _wasMyTurn = false;
  private _round = 0;
  private _subscriptions: Subject<Pool>[];

  ngOnInit() {
    const myTurnSubscription = this.meService.isMyTurn.subscribe(isMyTurn => {
      this._wasMyTurn = this._isMyTurn;
      this._isMyTurn = isMyTurn;
    });

    const poolSubscription = this.meService.poolChanged.subscribe(this.setInfo);

    this._subscriptions = [myTurnSubscription, poolSubscription];
  }

  openDialog(): void {
    const turnData: TurnData = { round: this._round };
    this.dialog.open(MyTurnDialogComponent, {
      width: '500px',
      data: turnData
    });
  }

  private setInfo = (pool: Pool) => {

    const isNewRound = this._round !== pool.round;
    const isFirstToPick = pool.draftOrder[0].poolerId === this.accountService.userState.userId;
    const isLastToPick = pool.draftOrder.slice(-1) === this.accountService.userState.userId;

    this._round = pool.round;
    if (this._isMyTurn && ((isNewRound && (isFirstToPick || isLastToPick)) || !this._wasMyTurn)) {
      this.openDialog();
    }

    if (pool.isFinished) {
      this.dialog.open(PoolFinishedDialogComponent);
    }
  }

  ngOnDestroy() {
    this._subscriptions.map(sub => sub.unsubscribe());
  }
}
