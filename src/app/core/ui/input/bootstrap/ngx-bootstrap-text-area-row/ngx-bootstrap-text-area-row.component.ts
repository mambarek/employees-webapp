import {Component, Input, Optional, Output, Self, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'ngx-bootstrap-text-area-row',
  templateUrl: './ngx-bootstrap-text-area-row.component.html',
})
export class NgxBootstrapTextAreaRowComponent implements ControlValueAccessor {

  @Input() name;
  @Input() label;
  @Input() invalidText;
  @Input() isReadonly = false;

  @Output() focus = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  @Output() input = new EventEmitter<any>();

  _dirty = false;
  _touched = false;

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
    if (value !== undefined && this._value !== value) {
      this._value = value;
      this.onChange(value);
      this.onTouch(value);
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

  public get valid(): boolean {
    return this.control ? this.control.valid : true;
  }

  public get invalid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  public get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? (dirty || touched) : false;
  }

  public get dirty(): boolean {
    return this._dirty;
  }

  get touched(): boolean {
    return this._touched
  }

  onFocus(event: Event) {
    this._touched = true;
    this.focus.emit(event);
  }

  onBlur(event: Event) {
    this.blur.emit(event);
  }

  onInput(event: Event) {
    this._dirty = true;
    this.input.emit(event);
  }
}
