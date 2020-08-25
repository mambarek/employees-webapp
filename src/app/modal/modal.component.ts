import {Component, Input, OnChanges, OnInit, Output, SimpleChange, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  bodyTemplate: TemplateRef<any>;
  @Input()
  show = false;
  @Input()
  title = 'Change the title!';
  @Input()
  headerNgClass = 'bg-primary text-white';
  @Input()
  submitButtonNgClass = 'bg-primary';

  constructor() {
  }

  ngOnInit(): void {
  }

}
