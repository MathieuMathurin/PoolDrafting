import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-salary-filter',
  templateUrl: './salary-filter.component.html',
  styleUrls: ['./salary-filter.component.scss']
})
export class SalaryFilterComponent {
  _minimum?: number;
  _maximum?: number;

  @Output() filterChanged = new EventEmitter<{min?: number, max?: number}>();

  onMinimumChanged = minValue => {
    this._minimum = minValue;
    this.filterChanged.emit({min: minValue, max: this._maximum});
  }

  onMaximumChanged = maxValue => {
    this._maximum = maxValue;
    this.filterChanged.emit({min: this._minimum, max: maxValue});
  }

  clear = () => {
    this._minimum = null;
    this._maximum = null;
  }
}
