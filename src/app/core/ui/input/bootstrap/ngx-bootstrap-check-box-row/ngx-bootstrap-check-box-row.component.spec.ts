import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CoreModule} from "../../../../core.module";
import {FormControl, NgControl} from "@angular/forms";
import {NgxBootstrapCheckBoxRowComponent} from "./ngx-bootstrap-check-box-row.component";

describe('NgxBootstrapCheckBoxRowComponent', () => {

  let component: NgxBootstrapCheckBoxRowComponent;
  let fixture: ComponentFixture<NgxBootstrapCheckBoxRowComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [CoreModule], // we need FormsModule and NgModule so import all at once
      declarations: [ NgxBootstrapCheckBoxRowComponent ],
      providers: [
        { provide: NgControl, useValue: new FormControl()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapCheckBoxRowComponent);
    component = fixture.componentInstance;

  });


})
