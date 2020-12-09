import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBootstrapDateRowComponent } from './ngx-bootstrap-date-row.component';
import {CoreModule} from "../../../../core.module";
import {FormControl, NgControl} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('NgxBootstrapDateRowComponent', () => {
  let component: NgxBootstrapDateRowComponent;
  let fixture: ComponentFixture<NgxBootstrapDateRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, NgbModule],
      declarations: [ NgxBootstrapDateRowComponent ],
      providers: [{ provide: NgControl, useValue: new FormControl()}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapDateRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
