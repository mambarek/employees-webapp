import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-bootstrap-text-area-row-component',
  templateUrl: './ngx-bootstrap-text-area-row-component.component.html',
  styleUrls: ['./ngx-bootstrap-text-area-row-component.component.css']
})
export class NgxBootstrapTextAreaRowComponentComponent implements OnInit {

  @Input() name;
  @Input() model: any;
  @Input() attributeName;
  @Input() label;
  @Input() invalidText;
  @Input() isReadonly = false;
  @Input() isRequired = false;
  @Input() maxLength;
  @Input() minLength;

  constructor() { }

  ngOnInit(): void {
  }

}
