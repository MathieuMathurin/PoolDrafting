import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pool } from "../models/pool";
import { Pick } from "../models/pick";
import { AccountService } from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class MeService {
  constructor(private http: HttpClient, private accountService: AccountService) {
    if (this.accountService.isAuthenticated) {
      this.getPoolState();
      this._intervalId = window.setInterval(this.getPoolState, 5000);
    }

    this.accountService.authenticationChanges.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.getPoolState();
        this._intervalId = window.setInterval(this.getPoolState, 5000);
      } else {
        window.clearInterval(this._intervalId);
      }
    });
  }

  isMyTurn = new EventEmitter<boolean>();
  poolChanged = new EventEmitter<Pool>();
  private _intervalId: number;

  getPoolState = async () => {
    try {
      const response = await this.http.get("/me/pool/", { observe: "response", responseType: "text" }).toPromise();
      const pool = JSON.parse(response.body) as Pool;

      if (pool.isFinished) {
        this.isMyTurn.emit(false);
        window.clearInterval(this._intervalId);
      } else {
        this.isMyTurn.emit(pool.round === 0 || pool.draftingPooler.poolerId === this.accountService.userState.userId);
      }

      this.poolChanged.emit(pool);

      return Promise.resolve(pool);
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  async getMyPicks(): Promise<Pick[]> {
    try {
      const response = await this.http.get("/me/picks/", { observe: "response", responseType: "text" }).toPromise();
      return Promise.resolve(JSON.parse(response.body) as Pick[]);
    } catch (e) {
      return Promise.resolve([]);
    }
  }
}
