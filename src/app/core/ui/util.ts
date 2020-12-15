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

export function trapFocus(element) {
  let focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  let firstFocusableEl = focusableEls[0];
  let lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  element.addEventListener('keydown', function(e: KeyboardEvent) {
    var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }

  });
}
