import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DayTime } from './typeDefinitions';

@Component({
  selector: 'time-input',
  template: `
      <input [ngModel]="value?.hours" name="hours" type="number" [disabled]="disabled"/>
      <input [ngModel]="value?.minutes" name="minutes" type="number" [disabled]="disabled"/>
      <button type="button" name="addHour" (click)="onAddHourButtonClick()" [disabled]="disabled" (blur)="onBlur()">
        Add hour
      </button>
  `,
  providers: [
    { useExisting: forwardRef(()=> TimeInputComponent), provide: NG_VALUE_ACCESSOR, multi: true}
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
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onAddHourButtonClick() {
    const newValue: DayTime = {
      hours: this.value.hours + 1,
      minutes: this.value.minutes
    };
    this.onChangeFunctions.forEach(fn=> fn(newValue));
    this.value = newValue;
  }

  onBlur() {
    this.onTouchedFunctions.forEach(fn=> fn());
  }
}
