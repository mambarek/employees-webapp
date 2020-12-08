import {Component, Input, Optional, Output, Self, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NgControl, NgForm} from "@angular/forms";

@Component({
  selector: 'ngx-bootstrap-text-area-row',
  templateUrl: './ngx-bootstrap-text-area-row.component.html',
})
export class NgxBootstrapTextAreaRowComponent implements ControlValueAccessor {

  @Input() mainFormControl: NgForm;
  @Input() name;
  @Input() label;
  @Input() invalidText;
  @Input() isReadonly = false;

  @Output() focus = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  @Output() input = new EventEmitter<any>();

  constructor(@Self() @Optional() public control: NgControl) {
    if ( this.control) { this.control.valueAccessor = this; }
  }

  // the callback function to register on UI change
  onChange: any = () => {
  }
  // the callback function to register on element touch
  onTouch: any = () => {
  }

  _value = '';

  // sets the value used by the ngModel of the element
  set value(value) {
    // this value is updated by programmatic changes
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
    }
  }

  get value(): any {
    return this._value;
  }

  // This will will write the value to the view if the the value changes occur on the model programmatically
  writeValue(value: any): void {
    this.value = value;
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

  public get externalControlInvalid(): boolean {
    return this.control ? this.control.valid : true;
  }

  public get externalControlValid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  onFocus(event: Event) {
    this.focus.emit(event);
  }

  onBlur(event: Event) {
    this.blur.emit(event);
  }

  onInput(event: Event) {
    this.input.emit(event);
  }

  get submitted(){
    return this.mainFormControl && this.mainFormControl.submitted;
  }
}
