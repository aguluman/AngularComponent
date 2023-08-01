import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DayTime } from './typeDefinitions';

@Component({
  selector: 'time-input',
  template: `
    <input [ngModel]="value?.hours" (ngModelChange)="onUserInput($event, value?.minutes)" name="hours" type="number"
           [disabled]="disabled"/>
    <input [ngModel]="value?.minutes" (ngModelChange)="onUserInput(value?.hours, $event)" name="minutes" type="number"
           [disabled]="disabled"/>
    <button type="button" name="addHour" (click)="onAddHourButtonClicked()" [disabled]="disabled" (blur)="onBlur()">
      Add hour
    </button>
    <span *ngIf="invalidData">time outside of scope</span>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(()=> TimeInputComponent), multi: true}
  ]
})

export class TimeInputComponent implements ControlValueAccessor {
  value: DayTime;

  writeValue(obj: any) {
    this.value = obj;
  }

  private onChangeFunctions = [];

  registerOnChange(fn: (v: DayTime) => void) {
    this.onChangeFunctions.push(fn);
  }

  private onTouchedFunctions = [];

  registerOnTouched(fn: any) {
    this.onTouchedFunctions.push(fn);
  }

  disabled = false;
  invalidData: any;

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onUserInput(hours: number, minutes: number) {
    this.onValueChanged({
      hours: hours,
      minutes: minutes
    });
  }

  onAddHourButtonClicked() {
    this.onValueChanged({
      hours: this.value.hours + 1,
      minutes: this.value.minutes
    });
  }

  onValueChanged(newValue: DayTime) {
    this.invalidData =
         newValue?.hours == undefined
      || newValue?.minutes == undefined
      || newValue?.hours > 23 || newValue?.hours < 0
      || newValue?.minutes > 59 || newValue?.minutes < 0

    this.onChangeFunctions.forEach(fn => fn(newValue));
    this.value = newValue;
  }

  onBlur() {
    this.onTouchedFunctions.forEach(fn => fn());
  }
}
