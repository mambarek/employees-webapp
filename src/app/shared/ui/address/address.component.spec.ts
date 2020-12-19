import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address.component';
import {SharedModule} from "../../shared.module";
import {Component} from "@angular/core";
import {Address} from "@angular-it2go/employees-api";
import {FormsModule} from "@angular/forms";
import {CoreModule} from "../../../core/core.module";

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressComponent ],
      imports:[SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@Component({
  selector: 'test-address',
  template: `
    <div class="container">
      <form name="address" ngForm>

        <ngx-bootstrap-text-input-row
          name="text"  label="Text"
          [(ngModel)]="text"
          required minlength="2" maxlength="10"
        ></ngx-bootstrap-text-input-row>

        <app-address [address]="address"></app-address>

      </form>
    </div>
  `
})
export class TestAddressComponent{
  text = "Special text";
  address: Address = <Address>{streetOne:"Bahnhofstr.", zipCode:"67655", city:"Kaiserlatern", countryCode:"US"};

  constructor() {
  }
}

describe('TestAddressComponent', () => {
  let component: TestAddressComponent;
  let fixture: ComponentFixture<TestAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAddressComponent ],
      imports:[SharedModule, CoreModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAddressComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})


@Component({
  selector: 'test-two-address',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-6">
          <form name="address1" ngForm>
            <app-address [address]="address1" prefix="addr1"></app-address>
          </form>
        </div>
        <div class="col-6">
          <form name="address2" ngForm>
            <app-address [address]="address2" prefix="addr2"></app-address>
          </form>
        </div>
      </div>
    </div>
  `
})
export class TwoAddressComponent{
  address1: Address = <Address>{streetOne:"Bahnhofstr.", zipCode:"67655", city:"Kaiserlatern", countryCode:"US"};
  address2: Address = <Address>{streetOne:"Richard wagner.", zipCode:"67656", city:"Kaiserlatern", countryCode:"DE"};

  constructor() {
  }
}

fdescribe('TwoAddressComponent', () => {
  let component: TwoAddressComponent;
  let fixture: ComponentFixture<TwoAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoAddressComponent, AddressComponent ],
      imports:[SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoAddressComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
