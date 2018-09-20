import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { PlayerService } from "../services/player.service";
import { Player } from '../models/player';
import { MeService } from "../services/me.service";
import { AccountService } from "../services/account.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private playerService: PlayerService, private meService: MeService, private accountService: AccountService, private snackBar: MatSnackBar) { }
  searchTerm: string;
  searchResults: Player[];
  isSearching: boolean;
  isMyTurn: boolean;
  selectedPlayerId: string;
  private _positions: string[];
  private _salaries: {min?: number, max?: number};
  private _team: string;

  ngOnInit() {
    this.searchTerm = "";
    this.searchResults = [];
    this.isSearching = false;
    this._positions = [];
    this._salaries = {};
    this._team = "";

    this.getPoolInfo();
    window.setInterval(this.getPoolInfo, 10000);

    this.search();
  }

  onPositionFilterChanged = async positions => {
    this._positions = positions;

    await this.search();
  }

  onSalaryFilterChanged = async salaries => {
    this._salaries = salaries;
    await this.search();
  };

  onTeamFilterChanged = async team => {
    this._team = team;

    await this.search();
  }

  onSearchValueChanged = async value => {
    this.searchTerm = value;

    await this.search();
  }

  toggleSelect = (playerId: string) => {
    this.selectedPlayerId = this.selectedPlayerId === playerId ? null : playerId;
  }

  draft = async () => {
    const isSuccess = await this.playerService.draft(this.selectedPlayerId);

    if (isSuccess) {
      const draftedPlayer = this.searchResults.find(player => player._id === this.selectedPlayerId);
      this.isMyTurn = false;
      this.snackBar.open(`${draftedPlayer.name} sélectionné!`, "OK", { duration: 3000 });
      await this.search();
    } else {
      this.snackBar.open("Le joueur n'est plus disponible ou ce n'est pas votre tour", "OK", { duration: 3000 });
      await this.search();
    }
  }

  private search = async () => {
    this.isSearching = true;

    try {
      this.searchResults = await this.playerService.search(this.searchTerm, this._positions, this._salaries, this._team);
    } catch (e) {
      this.searchResults = [];
    }

    this.isSearching = false;
  }

  private getPoolInfo = () => {
    this.meService.getPoolState().then(pool =>  this.isMyTurn = this.accountService.userState.userId === pool.draftingPooler.poolerId).catch(err => this.isMyTurn = false);
  }

}
