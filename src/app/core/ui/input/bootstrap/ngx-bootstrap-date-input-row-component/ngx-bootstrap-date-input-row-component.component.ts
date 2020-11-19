import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbDatepicker, NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngx-bootstrap-date-input-row-component',
  templateUrl: './ngx-bootstrap-date-input-row-component.component.html',
  styleUrls: ['./ngx-bootstrap-date-input-row-component.component.css']
})
export class NgxBootstrapDateInputRowComponentComponent implements OnInit {

  @Input() name;
  @Input() attributeName;
  @Input() label;
  @Input() invalidText;
  @Input() isReadonly = false;
  @Input() isRequired = false;

  private _model: any;

  get model(): any{
    return this._model;
  }

  @Input()
  set model(model: any){
    this._model = model;

    let modelDate;
    if(this.model){
      if(this.attributeName && this.model[this.attributeName]){
        modelDate = this.model[this.attributeName];
      } else {
        modelDate = this.model;
      }
    }

    if(modelDate)
      this.dateStruct = {year: modelDate[0], month: modelDate[1], day: modelDate[2]}
  }

  dateStruct: NgbDateStruct;
  @ViewChild('dp') dp: NgbDatepicker;

  constructor(private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
  }

  selectToday() {
    this.dateStruct = this.calendar.getToday();
  }

  setCurrent() {
    //Current Date
    this.dp.navigateTo()
  }

  onDateSelect(event) {
    if(this.model && this.model[this.attributeName]){
      if(this.attributeName && this.model[this.attributeName]){
        this.model[this.attributeName] = [this.dateStruct.year, this.dateStruct.month, this.dateStruct.day];
      }
      else {
        this.model = [this.dateStruct.year, this.dateStruct.month, this.dateStruct.day];
      }
    }
  }

}
