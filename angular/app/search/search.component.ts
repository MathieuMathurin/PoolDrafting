import { Component, OnInit } from '@angular/core';

import { MdInput } from '@angular2-material/input/input';
import { MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle, MdCardActions } from '@angular2-material/card/card'

import { replaceAccents } from '../pipes/replace-accents.pipe'
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

    analyseSearchTerm(): void{
        this.searchTerm = replaceAccents(this.searchTerm);
        if(this.searchTerm == ""){
            this.load();
        }else{
            this.search();
        }
    }

    load(): void {
        this.searchPlayerService.getPlayers().then(
            results => {
                this.players = results
            });
    }

    search(): void {
        this.searchPlayerService.searchPlayers(this.searchTerm, false).then(results => {
            if(results.length > 0){
                this.players = results;
            }else{
                this.searchPlayerService.searchPlayers(this.searchTerm, true).then(results => {
                    this.players = results;
                });
            }
        });
    }    
}