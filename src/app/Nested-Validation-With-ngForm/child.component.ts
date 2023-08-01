import { Component } from '@angular/core'
import { ControlContainer, NgForm } from "@angular/forms";

@Component({
  selector: 'child',
  template: `
    <input type="text" [(ngModel)]="childText" name="childText" required />
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm}],
})

export class ChildComponent {
  childText: string;
}
