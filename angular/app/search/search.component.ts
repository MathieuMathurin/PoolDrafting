import { Component } from '@angular/core';

import { MdInput } from '@angular2-material/input/input';
import { MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle, MdCardActions } from '@angular2-material/card/card'

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.component.html'
})
export class SearchComponent { 
    searchTerm: string;
}