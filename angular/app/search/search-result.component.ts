import { Component, Input, OnInit } from '@angular/core';

import { Dictionary } from '../models/dictionary';
import { LocalStorageService } from '../services/local-storage.service'

import { MdButton } from '@angular2-material/button/button'
import { MdCard, MdCardTitle, MdCardSubtitle, MdCardTitleGroup, MdCardHeader, MdCardContent, MdCardActions } from '@angular2-material/card/card'

@Component({
    selector: 'result',
    templateUrl: 'app/search/search-result.component.html',
    providers: [
        LocalStorageService
    ]
})
export class SearchResultComponent implements OnInit { 

    constructor(private localStorageService: LocalStorageService){ }

    @Input() player: any;
    @Input() playerID: any;
    expanded: boolean = false;
    @Input() stats: {displayValue: string, value:any}[] = [];
    added: boolean = false;
    wantsToAdd: boolean = false;

    ngOnInit():void {
        let tempDict: Dictionary;
        if(this.player.Prediction){
            let pred = this.player.Prediction;
            this.stats.push({displayValue: "2016-2017", value: {GP: pred.PJ, G: pred.BTS, A: pred.PAS, W: pred.VIC, L: pred.DEF, OT: pred.DP, SOW: pred.BL, SOL: 0}});
        }

        if(this.player.Stats){
            this.stats.push({displayValue: "2015-2016", value: this.player.Stats["2015-2016"]});
            this.stats.push({displayValue: "2014-2015", value: this.player.Stats["2014-2015"]});
            this.stats.push({displayValue: "2013-2014", value: this.player.Stats["2013-2014"]});
            this.stats = this.stats;
        }        
    }

    addPlayer(): void{
        var self = this;
        var callback: Function = function(): void{
            self.added = true;
        }

        this.localStorageService.update(this.player, this.playerID, callback);
    }

    
}