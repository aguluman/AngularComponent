import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DayTime } from './typeDefinitions';

@Component({
  selector: 'time-input',
  template: `
  <input [ngModel]="time.hours" name="hours" type="number" />
  <input [ngModel]="time.minutes" name="minutes" type="number" />
  <button type="button" name="addHour" (click)="onAddHourButtonClick()">Add hour</button>
  `
})

export class TimeInputComponent {
  @Input() time: DayTime;
  @Output() timeHasChanged = new EventEmitter<DayTime>();

  onAddHourButtonClick() {
    const newValue: DayTime = {
      hours: this.time.hours + 1,
      minutes: this.time.minutes
    };
    this.timeHasChanged.emit(newValue);
    this.time = newValue;
  }
}
