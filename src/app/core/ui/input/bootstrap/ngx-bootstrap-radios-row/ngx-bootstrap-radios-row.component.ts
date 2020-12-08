import {Component, Input, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl, NgForm} from "@angular/forms";

@Component({
  selector: 'ngx-bootstrap-radios-row',
  templateUrl: './ngx-bootstrap-radios-row.component.html',
  styleUrls: ['./ngx-bootstrap-radios-row.component.css']
})
export class NgxBootstrapRadiosRowComponent implements ControlValueAccessor {

  @Input() mainFormControl: NgForm;
  @Input() name;
  @Input() label;
  @Input() invalidText;
  @Input() isReadonly = false;

  @Input() items: {value: any, label: string}[] = [];

  _value = '';

  constructor(@Self() @Optional() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  // the callback function to register on UI change
  onChange: any = () => {
  }
  // the callback function to register on element touch
  onTouch: any = () => {
  }

  set value(value){
    // this value is updated by programmatic changes
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
    }
  }

  get value(): any {
    return this._value;
  }

  // upon UI element value changes, this method gets triggered
  // When the value in the UI is changed, this method will invoke a callback function
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // upon touching the element, this method gets triggered
  // When the element is touched, this method will get called
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // This will will write the value to the view if the the value changes occur on the model programmatically
  writeValue(value: any): void {
    this.value = value;
  }

  public get externalControlValid(): boolean {
    return this.control ? this.control.valid : true;
  }

  public get externalControlInvalid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  get submitted(){
    return this.mainFormControl && this.mainFormControl.submitted;
  }
}
