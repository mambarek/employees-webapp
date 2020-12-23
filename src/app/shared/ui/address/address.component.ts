import {Component, forwardRef, Input, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {Address} from "@angular-it2go/employees-api";
import {
  ControlContainer, FormGroup, NgForm, NgModelGroup
} from "@angular/forms";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm, deps: [[new Optional(), NgForm]] } ]
})
export class AddressComponent {

  @Input()
  address: Address;
  @Input()
  prefix: string;

  @ViewChild('groupControl') groupControl: NgModelGroup

  get invalid() : boolean {
    return this.groupControl.invalid;
  }

}
