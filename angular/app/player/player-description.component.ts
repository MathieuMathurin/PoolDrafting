import { Component, Input } from '@angular/core';

import { Player } from '../models/player';
import { MdCard, MdCardTitle, MdCardSubtitle, MdCardTitleGroup, MdCardHeader, MdCardContent, MdCardActions } from '@angular2-material/card/card';

import { UserService } from '../services/user.service'

@Component({
    selector: 'player-description',
    templateUrl: 'app/player/player-description.component.html'
})
export class PlayerDescriptionComponent {
    @Input() player: Player;
}