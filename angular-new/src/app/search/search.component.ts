import { Component, OnInit } from '@angular/core';
import { PlayerService } from "../services/player.service";
import { Player } from '../models/player';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private playerService: PlayerService) { }
  searchTerm: string;
  searchResults: Player[];
  isSearching: boolean;
  private _positions: string[];
  private _team;

  ngOnInit() {
    this.searchTerm = "";
    this.searchResults = [];
    this.isSearching = false;
    this._positions = [];
    this._team = "";

    this.search();
  }

  onPositionFilterChanged = async positions => {
    this._positions = positions;

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

  private search = async () => {
    this.isSearching = true;
    
    try {
      this.searchResults = await this.playerService.search(this.searchTerm, this._positions, this._team);
    } catch (e) {
      this.searchResults = [];
    }

    this.isSearching = false;
  }

}
