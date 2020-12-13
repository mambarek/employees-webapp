import {Component, Input, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl, NgForm, NgModel} from "@angular/forms";
import {hasRequired} from "../../../util";

@Component({
  selector: 'ngx-bootstrap-date-row',
  templateUrl: './ngx-bootstrap-date-row.component.html'
})
export class NgxBootstrapDateRowComponent implements ControlValueAccessor {

  @ViewChild('inputControl') _localControl: NgControl;
  @Input() name;
  @Input() label;
  @Input() invalidText;

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

  _value = '';
  _errorMessage = 'Please enter a valid date';

  constructor(@Self() @Optional() public parentNgModel: NgModel) {
    if (this.parentNgModel) {
      this.parentNgModel.valueAccessor = this;
    }
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

  public get parentNgModelValid(): boolean {
    return this.parentNgModel ? this.parentNgModel.valid : true;
  }

  public get parentNgModelInvalid(): boolean {
    return this.parentNgModel ? this.parentNgModel.invalid : false;
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

    if(!this.parentNgModel || !this.parentNgModel.control ||
      !this.parentNgModel.control.errors) {
      const message = this.messagesMap.defaultError;

      return message ? message : this._errorMessage;
    }

    const validatorName = Object.keys(this.parentNgModel.control.errors)[0];

    if(this.parentNgModel.control.errors.minlength){

      if(this.messagesMap.minlength){
        return this.messagesMap.minlength;
      }

      return this.label.concat(' must be at least ')
      .concat(this.parentNgModel.control.errors.minlength.requiredLength)
      .concat(' characters long.')
    }

    if(this.parentNgModel.control.errors.maxlength) {

      if(this.messagesMap.maxlength){
        return this.messagesMap.maxlength;
      }

      return this.label.concat(' must be a maximum of ')
      .concat(this.parentNgModel.control.errors.maxlength.requiredLength)
      .concat(' characters.')
    }

    // at least check for required. It can not came in the previous two cases
    if(this.parentNgModel.control.errors.required){
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
