import { Component, OnInit } from '@angular/core';

import { MdInput } from '@angular2-material/input/input';
import { MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle, MdCardActions } from '@angular2-material/card/card'

import { SearchPlayersService } from '../services/search-players.service';

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.component.html',
    providers: [
        SearchPlayersService
    ]
})
export class SearchComponent implements OnInit {
    constructor(private searchPlayerService: SearchPlayersService){ } 
    searchTerm: string;
    players: any[];

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.searchPlayerService.getPlayers().then(
            data => {
                this.players = data
            });
    }
}