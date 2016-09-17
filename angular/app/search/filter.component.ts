import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

import { SearchComponent } from './search.component'
import { IDictionary, Dictionary } from '../models/dictionary';
import { Filter } from '../models/filter';

//Import angular material component
import { MdInput } from '@angular2-material/input/input';
import { MdSidenav } from '@angular2-material/sidenav/sidenav';

class PositionFilter implements Filter {
    constructor(name: string, value: string) { this.name = name; this.value = value; }
    selected: boolean = false;
    name: string;
    value: string;

    getElasticSearchValue() {
        return { type: "position", value: this.value }
    }
}

class SalaryFilter implements Filter {
    constructor() { }
    min: number;
    max: number;

    getElasticSearchValue() {
        return { type: "salary", value: this.min + "-" + this.max };
    }
}

@Component({
    selector: 'filter',
    templateUrl: 'app/search/filter.component.html',
})
export class FilterComponent{
    opened = false;
    activeFilters: Dictionary = new Dictionary([]);
    forwardPositionFilters: PositionFilter[] = [
        new PositionFilter("AG", "LW"),
        new PositionFilter("C", "C"),
        new PositionFilter("AD", "RW"),
    ];
    defensePositionFilters: PositionFilter[] = [
        new PositionFilter("DEF", "D"),
        new PositionFilter("G", "G"),
    ];
    salaryFilter: SalaryFilter = new SalaryFilter;


    toggle(): void {
        this.opened = !this.opened;
    }

    managePositionFilters(filter: PositionFilter) {
        filter.selected = !filter.selected;
        if (filter.selected) {
            this.activeFilters.add(filter.name, filter);
        } else if (this.activeFilters.containsKey(filter.name)) {
            this.activeFilters.remove(filter.name);
        }
    }
}