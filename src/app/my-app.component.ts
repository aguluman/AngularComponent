import {Component} from "@angular/core";
import { DayTime } from "./typeDefinitions";

@Component({
  selector: 'my-app',
  template: `
    <form #exampleForm="ngForm" (ngSubmit)="performAction()">
      <time-input [(ngModel)]="timeInMyApp" name="time" withinTimeScope></time-input>
      <button type="submit" [disabled]="!exampleForm.valid">
        Perform Action</button>
    </form>
    <pre>{{ timeInMyApp | json }}</pre>
  `
})

export class AppComponent {
  timeInMyApp: DayTime = { hours: 8, minutes: 30 };

  performAction() {
    console.log(this.timeInMyApp);
  }
}
