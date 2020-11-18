import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NgxBootstrapTextInputRowComponent} from "./ngx-bootstrap-text-input-row.component";

describe('NgxBootstrapTextInputRowComponent', () => {
  let component: NgxBootstrapTextInputRowComponent;
  let fixture: ComponentFixture<NgxBootstrapTextInputRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBootstrapTextInputRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapTextInputRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
