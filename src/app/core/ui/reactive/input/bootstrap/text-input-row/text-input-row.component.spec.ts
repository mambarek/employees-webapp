import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextInputRowComponent } from './text-input-row.component';
import {Component, OnInit} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {SharedModule} from "../../../../../../shared/shared.module";
import {CoreModule} from "../../../../../core.module";
import {TestReactiveAddressComponent} from "../../../../../../shared/ui/address/address.component.spec";

describe('TextInputRowComponent', () => {
  let component: TextInputRowComponent;
  let fixture: ComponentFixture<TextInputRowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextInputRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component',
  template: `
    <form [formGroup]="form">
      <app-text-input-row formControlName="firstNameControl"
                          name="myfirstName"
                          maxlength="5"
                          label="FirstName"></app-text-input-row>
    </form>
    <p>Firstname: {{form.get('firstNameControl').value | json}}</p>
  `
})
export class TestTextInputRowComponent{
  form: FormGroup;
  name = "John";

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstNameControl: new FormControl("John", [Validators.required, Validators.minLength(3)])
    });
  }

}

describe('TestTextInputRowComponent in Reactive form', () => {
  let component: TestTextInputRowComponent;
  let fixture: ComponentFixture<TestTextInputRowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextInputRowComponent, TestTextInputRowComponent],
      imports:[SharedModule, CoreModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTextInputRowComponent);
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

/************************ Test in template *********************************/

@Component({
  selector: 'test-component',
  template: `
      <form #form=ngForm>
        <app-text-input-row
          label="Firstname:"
          [(ngModel)]="firstName" name="firstName"
          required maxlength="7" minlength="2"
        >
        </app-text-input-row>
        <p>First Name: {{firstName}}</p>
      </form>
  `
})
export class TestInTemplateComponent {
  firstName = 'Ali';

}

fdescribe('TestInTemplateComponent',() => {

  let component: TestInTemplateComponent;
  let fixture: ComponentFixture<TestInTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextInputRowComponent, TestInTemplateComponent],
      imports:[SharedModule, CoreModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInTemplateComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });


})
