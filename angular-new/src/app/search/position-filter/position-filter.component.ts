import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-filter',
  templateUrl: './position-filter.component.html',
  styleUrls: ['./position-filter.component.scss']
})
export class PositionFilterComponent implements OnInit {
  activeFilters: { [key: string]: PositionFilter };

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
    this.activeFilters = {};
  }

  managePositionFilters(filter: PositionFilter) {
    filter.selected = !filter.selected;
    if (filter.selected) {
      this.activeFilters[filter.name] = filter;
    } else if (this.activeFilters[filter.name]) {
      this.activeFilters[filter.name] = undefined;
    }
  }

}

class PositionFilter {
  constructor(name: string, value: string) { this.name = name; this.value = value; }
  selected = false;
  name: string;
  value: string;
}
