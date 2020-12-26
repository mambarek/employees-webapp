import {Component, EventEmitter, Input, Optional, Output, Self, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NgControl, NgForm, NgModel,} from "@angular/forms";
import {hasRequired} from "../../../util";

@Component({
  selector: 'ngx-bootstrap-text-input-row',
  templateUrl: './ngx-bootstrap-text-input-row.component.html',
})
export class NgxBootstrapTextInputRowComponent implements ControlValueAccessor{

  @ViewChild('inputControl') _localNgModel: NgModel;
  @Input() name;
  @Input() label;
  @Input() type: 'text' | 'password' | 'email' = 'text';

  @Output() focus = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  @Output() input = new EventEmitter<any>();

  /**
   * in messageMap you can override error messages
   * the map has following structure {validatorName: errorMessage}
   * a.e {minlength: "My custom minlength message for minlength 5"}
   * So you can put you custom messages for your custom validators
   *
   * instead of map we can use a service that can be injected
   */
  @Input()
  messagesMap: any = {};

  _value;
  _errorMessage = 'Please enter a valid value';

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

  get decoratedLabel(): string {
    return this.isRequired() ? this.label + '*' : this.label;
  }

  get localControl(): NgModel {
    return this._localNgModel;
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
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
    }
  }

  get value(): any {
    return this._value;
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

  public get parentControlValid(): boolean {
    return this.parentControl ? this.parentControl.valid : true;
  }

  public get parentControlInvalid(): boolean {
    return this.parentControl ? this.parentControl.invalid : false;
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
    //console.log('get submitted for ' + this.label, this);
    if(!this.parentControl || !this.parentControl['formDirective']) return false;

    return this.parentControl['formDirective'].submitted;
  }

  /**
   * if this component is embedded in a parent component
   * parent can set a required validator. we can use this add "*" to label
   * or highlight it with som css style
   */
  isRequired(): boolean{
    if(!this.parentControl || !this.parentControl.control) return false;

    return hasRequired(this.parentControl.control);
  }

  /**
   * default error message
   * @param errorText
   */
  set errorMessage(errorText){
    this._errorMessage = errorText
  }

  /**
   * if this component is embedded in a parent component
   * parent can set a list of validators. optionally the parent
   * can use its own custom error messages putting a messageMap
   * This messages would be displayed in the feed-back div
   */
  get errorMessage(): string {

    if(!this.parentControl || !this.parentControl.control ||
      !this.parentControl.control.errors) {
      const message = this.messagesMap.defaultError;

      return message ? message : this._errorMessage;
    }

    const validatorName = Object.keys(this.parentControl.control.errors)[0];

    if(this.parentControl.control.errors.minlength){

      if(this.messagesMap.minlength){
        return this.messagesMap.minlength;
      }

      return this.label.concat(' must be at least ')
      .concat(this.parentControl.control.errors.minlength.requiredLength)
      .concat(' characters long.')
    }

    if(this.parentControl.control.errors.maxlength) {

      if(this.messagesMap.maxlength){
        return this.messagesMap.maxlength;
      }

      return this.label.concat(' must be a maximum of ')
      .concat(this.parentControl.control.errors.maxlength.requiredLength)
      .concat(' characters.')
    }

    // at least check for required. It can not came in the previous two cases
    if(this.parentControl.control.errors.required){
      if(this.messagesMap.required){
        return this.messagesMap.required;
      }

      return this.label.concat(' is required.')
    }

    // errors from custom and other validators
    if(validatorName && this.messagesMap.validatorName) {
      return this.messagesMap.validatorName;
    }

    return this._errorMessage;
  }
}
