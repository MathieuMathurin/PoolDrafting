import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() label: string;
  @Input() type ? = "text";
  @Input() isMaxWidth ? = false;
  @Input() appearance ? = "standard";

  @Output() valueChanged = new EventEmitter<string>();
  _value: string;
  _timeout?: number;

  ngOnInit() {
    this._value = "";
  }

  onIconClick = () => {
    this._value = "";
  }

  private emitValue = (value: string) => {
    this.valueChanged.emit(value);
  }

  private debounce = (value) => {
    const functionCall = this.emitValue;
    const debounceTime = 1000;

    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }

    this._timeout = window.setTimeout(functionCall, debounceTime, value);
  }
}
