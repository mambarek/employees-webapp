import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputRowComponent } from './text-input-row.component';
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../../../../../shared/shared.module";
import {CoreModule} from "../../../../../core.module";
import {TestReactiveAddressComponent} from "../../../../../../shared/ui/address/address.component.spec";

describe('TextInputRowComponent', () => {
  let component: TextInputRowComponent;
  let fixture: ComponentFixture<TextInputRowComponent>;

  beforeEach(async(() => {
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
      <app-text-input-row ></app-text-input-row>
    </form>
  `
})
export class TestTextInputRowComponent implements OnInit{
  form: FormGroup;
  name;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      name
    });
  }
}

describe('TestTextInputRowComponent', () => {
  let component: TestTextInputRowComponent;
  let fixture: ComponentFixture<TestTextInputRowComponent>;

  beforeEach(async(() => {
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

  it('should create', async(() => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
      //console.log(component.addressComponent.groupControl)
    })

  }));
})
