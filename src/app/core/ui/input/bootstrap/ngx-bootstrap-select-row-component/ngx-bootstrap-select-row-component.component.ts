import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-bootstrap-select-row-component',
  templateUrl: './ngx-bootstrap-select-row-component.component.html',
  styleUrls: ['./ngx-bootstrap-select-row-component.component.css']
})
export class NgxBootstrapSelectRowComponentComponent implements OnInit, AfterViewInit {

  @Input() name;
  @Input() model: any;
  @Input() attributeName;
  @Input() label;
  @Input() invalidText;
  @Input() isReadonly = false;
  @Input() isRequired = false;
  @Input() items: any[] = [];
  @Input() itemKey;
  @Input() itemLabel;

  constructor() { }

  ngOnInit(): void {
    //this.items = [{id: 'DISEL', value: 'DIESEL'}, {id: 'PETROL', value: 'PETROL'}];
    console.log("-- ngOnInit Select log model " + this.model);
    console.log("-- ngOnInit Select log items " + this.items);
  }

  ngAfterViewInit(): void {
    console.log("-- ngAfterViewInit Select log items " + this.items);
  }

}
