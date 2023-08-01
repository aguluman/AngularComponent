import { Directive, forwardRef } from "@angular/core";
import { NG_VALIDATORS, FormControl } from "@angular/forms";
import { DayTime } from "./typeDefinitions";

@Directive({
  selector: "time-input[withinTimeScope]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => WithinTimeScopeDirective), multi: true }
  ]
})
export class WithinTimeScopeDirective {
  validate(formControl: FormControl) {
    const controlValue: DayTime = formControl.value;
    const isInvalid =
      controlValue?.hours == undefined
      || controlValue?.minutes == undefined
      || controlValue?.hours > 23 || controlValue?.hours < 0
      || controlValue?.minutes > 59 || controlValue?.minutes < 0;

    return isInvalid ? {
      "ourErrorCode": {
        valid: false
      }
    } : null;
  }
}
