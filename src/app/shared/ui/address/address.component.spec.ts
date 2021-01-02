import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddressComponent } from './address.component';
import {SharedModule} from "../../shared.module";
import {Component, OnInit, Optional, ViewChild} from "@angular/core";
import {Address} from "@angular-it2go/employees-api";
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule, NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {CoreModule} from "../../../core/core.module";

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(waitForAsync(() => {
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
      <form #form=ngForm>
        <p>Form valid: {{form.valid}}</p>
        <p>Form value: {{form.value | json}}</p>

        <ngx-bootstrap-text-input-row
          name="name"  label="Name"
          [(ngModel)]="user.name"
          required minlength="2" maxlength="10"
        ></ngx-bootstrap-text-input-row>

        <app-address [address]="user.address" #addressComponent></app-address>
        <!--<app-address [(ngModel)]="address" name="address" prefix="t"></app-address>-->

      </form>
    </div>
  `
})
export class TestAddressComponent{
  user = {
    name: "John",
    address: <Address>{streetOne:"Bahnhofstr.", zipCode:"67655", city:"Kaiserlatern", countryCode:"US", buildingNr: "105"}
  }
  text = "Special text";
  address: Address = <Address>{streetOne:"Bahnhofstr.", zipCode:"67655", city:"Kaiserlatern", countryCode:"US"};

  @ViewChild('addressComponent') addressComponent;

  constructor() {
  }
}

describe('TestAddressComponent', () => {
  let component: TestAddressComponent;
  let fixture: ComponentFixture<TestAddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAddressComponent],
      imports:[SharedModule, CoreModule, FormsModule],

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

  it('should create', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
      console.log(component.addressComponent.groupControl)
    })

  }));
})

@Component({
  selector: 'test-reactive',
  template: `
    <div class="container">
      <form [formGroup]="formGroup" >
        <p>Form valid: {{formGroup.valid}}</p>
        <p>Form value: {{formGroup.value | json}}</p>

        <ngx-bootstrap-text-input-row
          name="name" label="Name"
          formControlName="firstName" required maxlength="5"
        ></ngx-bootstrap-text-input-row>

        <app-address [address]="user.address" formControlName="address" #addressComponent></app-address>

      </form>
    </div>
  `
})
export class TestReactiveAddressComponent implements OnInit {
  user = {
    name: "John",
    address: <Address>{streetOne:"Bahnhofstr.", zipCode:"67655", city:"Kaiserslautern", countryCode:"US", buildingNr: "105"}
  }

  @ViewChild('addressComponent') addressComponent;

  formGroup: FormGroup;
  constructor( private formBuilder: FormBuilder) {
  }

  ngOnInit () {

    this.formGroup = this.formBuilder.group({
      firstName: new FormControl(this.user.name),
      address: new FormControl(this.user.address)
    });
  }
}

describe('TestReactiveAddressComponent', () => {
  let component: TestReactiveAddressComponent;
  let fixture: ComponentFixture<TestReactiveAddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestReactiveAddressComponent],
      imports:[SharedModule, CoreModule, ReactiveFormsModule],
      providers:[{ provide: ControlContainer, useExisting: FormGroup, deps: [[new Optional(), FormGroup]] }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReactiveAddressComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
      //console.log(component.addressComponent.groupControl)
    })

  }));
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

describe('TwoAddressComponent', () => {
  let component: TwoAddressComponent;
  let fixture: ComponentFixture<TwoAddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoAddressComponent, AddressComponent ],
      imports:[SharedModule, FormsModule]
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
