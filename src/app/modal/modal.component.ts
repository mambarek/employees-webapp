import {Component, Input, OnChanges, OnInit, Output, SimpleChange, TemplateRef, EventEmitter} from '@angular/core';

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
  @Input()
  saveButtonText = 'Save';

  @Output()
  saveEvent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saveEvent.emit();
  }
}
