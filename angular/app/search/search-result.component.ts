import { Component, Input } from '@angular/core';

import { Dictionary } from '../models/dictionary';
import { Player } from '../models/player';
import { UserService } from '../services/user.service'

import { MdButton } from '@angular2-material/button/button'
import { MdCard, MdCardTitle, MdCardSubtitle, MdCardTitleGroup, MdCardHeader, MdCardContent, MdCardActions } from '@angular2-material/card/card'

@Component({
    selector: 'result',
    templateUrl: 'app/search/search-result.component.html',
    providers: [
        UserService
    ]
})
export class SearchResultComponent { 

    constructor(private userService: UserService){ }

    @Input() player: Player;
    expanded: boolean = false;
    @Input() stats: {displayValue: string, value:any}[] = [];
    added: boolean = false;
    wantsToAdd: boolean = false;

    addPlayer(): void{
        var self = this;
        var callback: Function = function(): void{
            self.added = true;
        }

        this.userService.update(this.player, true, callback);
    }

    
}