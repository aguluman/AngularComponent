import { Component } from "@angular/core";
import { DayTime } from './typeDefinitions';

@Component({
  selector: 'my-app',
  template: `<time-input [(time)]="timeInMyApp"></time-input>
  <pre>{{ timeInMyApp | json }}</pre>
  `
})

export class MyAppComponent {
  timeInMyApp: DayTime = { hours: 8, minutes: 30 };
}
