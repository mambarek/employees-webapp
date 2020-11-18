import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'ngx-bootstrap-text-input-row',
  templateUrl: './ngx-bootstrap-text-input-row.component.html',
  styleUrls: ['./ngx-bootstrap-text-input-row.component.css']
})
export class NgxBootstrapTextInputRowComponent implements OnInit, AfterViewInit  {

  @Input() name;
  @Input() model: any;
  @Input() attributeName;
  @Input() label;
  @Input() invalidText;
  @Input() isReadonly = false;
  @Input() isRequired = false;
  @Input() maxLength;
  @Input() minLength;

  @ViewChild('box')
  box: ElementRef;

  @ViewChild('input_box')
  input_box: ElementRef;

  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("--> ngAfterViewInit");
/*    console.log("--> ngAfterViewInit");
    console.log(this.input_box);
    console.log(this.box.nativeElement)
    this.box.nativeElement.removeAttribute('required');
    this.box.nativeElement.removeAttribute('ng-reflect-required');*/
  }

}
