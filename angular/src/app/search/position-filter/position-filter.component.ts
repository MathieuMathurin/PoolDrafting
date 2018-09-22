import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-position-filter',
  templateUrl: './position-filter.component.html',
  styleUrls: ['./position-filter.component.scss']
})
export class PositionFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<string[]>();

  private _activeFilters: { [key: string]: PositionFilter };

  forwardPositionFilters: PositionFilter[] = [
    new PositionFilter("AG", "LW"),
    new PositionFilter("C", "C"),
    new PositionFilter("AD", "RW"),
  ];
  defensePositionFilters: PositionFilter[] = [
    new PositionFilter("DEF", "D"),
    new PositionFilter("G", "G"),
  ];

  ngOnInit() {
    this._activeFilters = {};
  }

  managePositionFilters(filter: PositionFilter) {
    filter.selected = !filter.selected;
    if (filter.selected) {
      this._activeFilters[filter.name] = filter;
    } else if (this._activeFilters[filter.name]) {
      delete this._activeFilters[filter.name];
    }

    this.filterChanged.emit(Object.values(this._activeFilters).map(f => f.value));
  }

}

class PositionFilter {
  constructor(name: string, value: string) { this.name = name; this.value = value; }
  selected = false;
  name: string;
  value: string;
}
