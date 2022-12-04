import {
  Component,
  forwardRef, Host,
  Input,
  OnInit,
  Optional,
  Self,
  SkipSelf,
  ViewChild
} from '@angular/core';

import {
  ControlContainer,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
  NgModelGroup
} from "@angular/forms";
import {Address} from "../../../apis/it-2go/car-fleet-api";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm, deps: [[new Optional(), NgForm]] } ],
/*  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressComponent),
    }
  ]*/
})
export class AddressComponent implements ControlValueAccessor{

  @Input()
  address: Address;
  @Input()
  prefix: string;

  //@ViewChild('groupControl') groupControl: NgModelGroup

  /**
   * We’re injecting the NgControl which is the super class of both formControlName and ngModel,
   * with that, we’re not coupling our form control to any of the template or reactive module.
   *
   * We’re decorating our control with the @Self() decorator. That way we’re ensuring our control
   * will not be overwritten by the injector tree.
   * @param parentControl
   */
  constructor(@Self() @Optional() public parentControl: NgControl) {
    if ( this.parentControl) {
      this.parentControl.valueAccessor = this;
    }
  }

  get invalid() : boolean {
    //return this.groupControl.invalid;
    return this.parentControl.invalid;
  }

  /**
   * the callback function to register on UI change
   */
  onChange: any = () => {
  }

  /**
   * the callback function to register on element touch
   */
  onTouch: any = () => {
  }

  /**
   * sets the value used by elements ngModel
   * @param value
   */
  set value(value) {
    console.log('-->> set value', value);
    if (this.address !== value) {
      this.address = value;
      this.onChange(value);
    }
  }

  get value(): any {
    return this.address;
  }

  /**
   * This will write the value to view if the value changes
   * @param value
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * upon UI element value changes, this method gets triggered
   * When the value in the UI is changed, this method will invoke a callback function
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * upon touching the element, this method gets triggered
   * When the element is touched, this method will get called
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
