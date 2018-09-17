import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-optional-input',
  templateUrl: './optional-input.component.html',
  styleUrls: ['./optional-input.component.scss']
})
export class OptionalInputComponent implements OnInit {
  @Input() placeHolder: string;
  @Input() type ? = "text";
  @Input() value: string;

  @Output() valueChanged = new EventEmitter();
  private _timeout: number;

  ngOnInit() {
  }

  emitValue = value => {
    this.valueChanged.emit(value);
  }

  private debounce = (value) => {
    const functionCall = this.emitValue;
    const debounceTime = 500;

    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }

    this._timeout = window.setTimeout(functionCall, debounceTime, value);
  }
}
