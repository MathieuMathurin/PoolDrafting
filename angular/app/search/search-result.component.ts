import { Component, Input, OnInit } from '@angular/core';

import { Dictionary } from '../models/dictionary';

import { MdCard, MdCardTitle, MdCardSubtitle, MdCardTitleGroup, MdCardHeader, MdCardContent, MdCardActions } from '@angular2-material/card/card'

@Component({
    selector: 'result',
    templateUrl: 'app/search/search-result.component.html'
})
export class SearchResultComponent implements OnInit { 
    @Input() player: any;
    expanded: boolean = false;
    @Input() stats: {displayValue: string, value:any}[] = [];

    ngOnInit():void {
        let tempDict: Dictionary;
        if(this.player.Stats){
            Object.keys(this.player.Stats).forEach(key => {
                this.stats.push({displayValue: key, value: this.player.Stats[key]});
            });
            this.stats = this.stats.reverse();
        }        
    }

    
}