import {Component, EventEmitter, Input, Optional, Output, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl, NgForm, NgModel} from "@angular/forms";
import {hasRequired} from "../../../util";

@Component({
  selector: 'ngx-bootstrap-select-row',
  templateUrl: './ngx-bootstrap-select-row.component.html',
})
export class NgxBootstrapSelectRowComponent implements ControlValueAccessor {

  @ViewChild('selectControl') _localControl: NgControl;
  @Input() name;
  @Input() label;
  @Input() invalidText;
  @Input() isReadonly = false;

  @Input() items: any[] = [];
  @Input() itemKey;
  @Input() itemLabel;

  @Output() focus = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  @Output() input = new EventEmitter<any>();

  constructor(@Self() @Optional() public parentNgModel: NgModel) {
    if ( this.parentNgModel) { this.parentNgModel.valueAccessor = this; }
  }

  get localControl(): NgControl {
    return this._localControl;
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

  public get parentNgModelValid(): boolean {
    return this.parentNgModel ? this.parentNgModel.valid : true;
  }

  public get parentNgModelInvalid(): boolean {
    return this.parentNgModel ? this.parentNgModel.invalid : false;
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
    if(!this.parentNgModel || !this.parentNgModel.formDirective) return false;
    return this.parentNgModel.formDirective.submitted;
  }

  /**
   * if this component is embedded in a parent component
   * parent can set a required validator. we can use this add "*" to label
   * or highlight it with som css style
   */
  isRequired(): boolean{
    if(!this.parentNgModel || !this.parentNgModel.control) return false;

    return hasRequired(this.parentNgModel.control);
  }
}
