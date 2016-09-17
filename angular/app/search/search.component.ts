//Solution to watch objects
//http://juristr.com/blog/2016/04/angular2-change-detection/

import { Component, OnInit, Input, DoCheck, KeyValueDiffers } from '@angular/core';

import { IDictionary, Dictionary  } from '../models/dictionary';
import { Filter } from '../models/filter';

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
export class SearchComponent implements OnInit, DoCheck {
    constructor(private searchPlayerService: SearchPlayersService, private differs: KeyValueDiffers){ 
        this.differ = differs.find({}).create(null);
    } 
    searchTerm: string = "";
    players: any[];
    @Input() filters: Dictionary;
    differ: any;

    

    ngOnInit(): void {
        this.load();
    }

    ngDoCheck() {
        var changes = this.differ.diff(this.filters);
        if(changes){
            this.analyseSearchTerm();
        }
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
        this.searchPlayerService.getPlayers(this.filters).then(
            results => {
                this.players = results
            });
    }

    search(): void {
        this.searchPlayerService.searchPlayers(this.searchTerm, false, this.filters).then(results => {
            if(results.length > 0){
                this.players = results;
            }else{
                this.searchPlayerService.searchPlayers(this.searchTerm, true, this.filters).then(results => {
                    this.players = results;
                });
            }
        });
    }    
}