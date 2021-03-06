import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material";
import { PlayerService } from "../services/player.service";
import { Player } from '../models/player';
import { MeService } from "../services/me.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(private playerService: PlayerService, private meService: MeService, private snackBar: MatSnackBar) { }
  searchTerm: string;
  searchResults: Player[];
  isSearching: boolean;
  isMyTurn: boolean;
  selectedPlayerId: string;
  private _positions: string[];
  private _salaries: { min?: number, max?: number };
  private _team: string;
  private _myTurnSub: Subject<boolean>;

  ngOnInit() {
    this.searchTerm = "";
    this.searchResults = [];
    this.isSearching = false;
    this._positions = [];
    this._salaries = {};
    this._team = "";

    this._myTurnSub = this.meService.isMyTurn.subscribe(isMyTurn => {
      this.isMyTurn = isMyTurn;
    });

    this.search();
  }

  onPositionFilterChanged = async positions => {
    this._positions = positions;

    await this.search();
  }

  onSalaryFilterChanged = async salaries => {
    this._salaries = salaries;
    await this.search();
  }

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
      this.snackBar.open("Le joueur n'est plus disponible", "OK", { duration: 3000 });
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

  ngOnDestroy() {
    this._myTurnSub.unsubscribe();
  }
}
