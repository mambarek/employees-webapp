import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBootstrapDateRowComponent } from './ngx-bootstrap-date-row.component';

describe('NgxBootstrapDateComponent', () => {
  let component: NgxBootstrapDateRowComponent;
  let fixture: ComponentFixture<NgxBootstrapDateRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBootstrapDateRowComponent ]
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
