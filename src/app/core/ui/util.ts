import {AbstractControl} from "@angular/forms";

export function hasRequired(abstractControl: AbstractControl): boolean{
  if (abstractControl.validator) {
    const validator = abstractControl.validator({}as AbstractControl);
    //if(validator) console.log("--Validator",validator);
    if (validator && validator.required) {
      return true;
    }
  }
  return false;
}
