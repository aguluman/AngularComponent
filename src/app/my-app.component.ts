import { Component } from "@angular/core";
import { DayTime } from './typeDefinitions';

@Component({
  selector: 'my-app',
  template: `<time-input [time]="timeInMyApp" (timeHasChanged)="timeInMyApp=$event"></time-input>
  <pre>{{ timeInMyApp | json }}</pre>
  `
})

export class AppComponent {
  timeInMyApp: DayTime = { hours: 8, minutes: 30 };
}
