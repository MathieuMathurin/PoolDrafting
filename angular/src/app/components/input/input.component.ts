import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

export interface InputErrorMessages {
    requiredErrorMessage: string;
    maxLengthErrorMessage?: string;
}

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {
    @Input("placeHolder") placeHolder: string;
    @Input("errorMessages") errorMessages: InputErrorMessages;
    @Input("type") type ? = "text";
    @Input("maxLength") maxLength?: number;

    @Output() valueChanged = new EventEmitter<string>();
    @Output() statusChanged = new EventEmitter<boolean>();

    inputControl: FormControl;
    private _unsubscriber = new Subject();

    ngOnInit() {
        const validators = [
            Validators.required
        ];

        if (this.maxLength !== null) {
            validators.push(Validators.maxLength(this.maxLength));
        }

        this.inputControl = new FormControl("", validators);

        this.inputControl.valueChanges.pipe(takeUntil(this._unsubscriber)).subscribe({
            next: value => this.valueChanged.emit(value)
        });

        this.inputControl.statusChanges.pipe(takeUntil(this._unsubscriber)).subscribe({
            next: status => this.onStatusChanged(status)
        });
    }

    ngOnDestroy() {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    private onStatusChanged = status => {
        switch (status) {
            case "VALID":
                this.statusChanged.emit(true);
                break;
            case "INVALID":
                this.statusChanged.emit(false);
                break;
        }
    }
}
