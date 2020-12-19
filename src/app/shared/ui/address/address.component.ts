import {Component, Input, OnInit} from '@angular/core';
import {Address} from "@angular-it2go/employees-api";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input()
  address: Address;// = <Address>{};
  @Input()
  prefix: string;

  constructor() { }

  ngOnInit(): void {
  }

}
