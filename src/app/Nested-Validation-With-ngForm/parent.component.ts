import { Component } from "@angular/core";

@Component({
  selector: 'parent',
  template: `
    <form #myForm="ngForm">
      <input type="text" [(ngModel)]="parentText" name="parentText" required />
      <child></child>
      <button type="submit" [disabled]="!myForm.form.valid">Submit</button>
    </form>
  `,
})

export class ParentComponent {
  parentText = 'foo';
}
