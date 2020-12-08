import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NgxBootstrapTextInputRowComponent} from "./ngx-bootstrap-text-input-row.component";
import {CoreModule} from "../../../../core.module";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {FormControl, NgControl} from "@angular/forms";

/**
 * Validation cases

 [class.is-invalid]="(localControl.dirty || submitted) && (localControl.invalid || externalControlInvalid)"
 [class.is-valid]="localControl.dirty && localControl.valid && externalControlValid"

 is-invalid
 1) dirty && local_invalid = true
 2) dirty && external_invalid = true

 3) submitted && local_invalid = true
 4) submitted && external_invalid = true
 */
describe('NgxBootstrapTextInputRowComponent', () => {
  let component: NgxBootstrapTextInputRowComponent;
  let fixture: ComponentFixture<NgxBootstrapTextInputRowComponent>;
  let el: DebugElement;
  let ngControl: any;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ NgxBootstrapTextInputRowComponent ],
      providers: [
        { provide: NgControl, useValue: new FormControl()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapTextInputRowComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component should have a label', () => {
    component.label = 'Firstname'
    component.value = 'Ali';
    component.invalidText = 'Please give a valid Firstname';
    fixture.detectChanges();

    const label = el.query(By.css('label'));
    expect(label.nativeElement.textContent).toEqual('Firstname');
  })

  it('No user input (dirty=false) component should NOT have "is-valid" class', async(() => {
    component.label = 'Firstname'
    component.value = 'Ali';
    component.invalidText = 'Please give a valid Firstname';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const input = el.query(By.css('input'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.value).toBe('Ali');
      expect(input.nativeElement.classList.contains('is-valid')).toBe(false)
    })
  }))

  it('After user input (dirty=true) component should have "is-valid" class', async(() => {
    component.label = 'Firstname'
    component.value = 'Ali';
    component.invalidText = 'Please give a valid Firstname';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const input = el.query(By.css('input'));
      expect(input).toBeTruthy();

      input.nativeElement.value = 'Omar'
      input.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();

      expect(input.nativeElement.classList.contains('is-valid')).toBe(true)
    })
  }))

  it('(1) dirty && local_invalid component should have "is-invalid" class', fakeAsync(() => {
    component.label = 'Firstname'
    component.value = 'Ali';
    component.invalidText = 'Please give a valid Firstname';
    fixture.detectChanges();

    const input = el.query(By.css('input'));
    expect(input).toBeTruthy();

    input.nativeElement.value = 'Omar'
    input.nativeElement.dispatchEvent(new Event('input'))

    // set localControl state to invalid
    spyOnProperty(component.localControl,"valid","get").and.returnValue(false);
    spyOnProperty(component.localControl,"invalid","get").and.returnValue(true);

    fixture.detectChanges();

    expect(input.nativeElement.classList.contains('is-invalid')).toBe(true)
    expect(input.nativeElement.classList.contains('is-valid')).toBe(false)
  }))

  it('(2) should ADD class "is-invalid" when dirty and external control INVALID', async(() => {

    ngControl = TestBed.inject(NgControl);
    spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
    spyOnProperty(ngControl,"valid","get").and.returnValue(false);
    component.control = ngControl;
    component.label = 'Firstname'
    component.value = 'Ali';
    component.invalidText = 'Please give a valid Firstname';

    fixture.whenStable().then(() => {
      const input = el.query(By.css('input'));
      expect(input).toBeTruthy();

      input.nativeElement.value = 'Omar'
      input.nativeElement.dispatchEvent(new Event('input'))

      fixture.detectChanges();

      expect(input.nativeElement.classList.contains('is-invalid')).toBe(true);
      expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
    })
  }))

  it('(3) submitted && local invalid should ADD "is-invalid" class', fakeAsync(() => {

    component.control = ngControl;
    component.label = 'Firstname'
    component.value = 'Ali';
    component.invalidText = 'Please give a valid Firstname';
    // set localControl state to invalid
    spyOnProperty(component.localControl,"valid","get").and.returnValue(false);
    spyOnProperty(component.localControl,"invalid","get").and.returnValue(true);
    // set component as submitted
    spyOnProperty(component,"submitted","get").and.returnValue(true);
    // update component
    fixture.detectChanges();
    const input = el.query(By.css('input'));
    expect(input).toBeTruthy();
    expect(input.nativeElement.classList.contains('is-invalid')).toBe(true);
    expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
  }));

  it('!(4) should NOT ADD class "is-invalid" when NOT submitted and NOT dirty and external control INVALID', async(() => {

    ngControl = TestBed.inject(NgControl);
    spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
    spyOnProperty(ngControl,"valid","get").and.returnValue(false);
    component.control = ngControl;
    component.label = 'Firstname'
    component.invalidText = 'Please give a valid Firstname';

    fixture.whenStable().then(() => {
      const input = el.query(By.css('input'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.classList.contains('is-invalid')).toBe(false);
      expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
    })
  }))

  it('(4) should ADD class "is-invalid" when submitted and NOT dirty and external control INVALID', fakeAsync(() => {

    ngControl = TestBed.inject(NgControl);
    spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
    spyOnProperty(ngControl,"valid","get").and.returnValue(false);
    component.control = ngControl;
    component.label = 'Firstname'
    component.invalidText = 'Please give a valid Firstname';

    spyOnProperty(component,"submitted","get").and.returnValue(true);
    // update component
    fixture.detectChanges();
    const input = el.query(By.css('input'));
    expect(input).toBeTruthy();
    expect(input.nativeElement.classList.contains('is-invalid')).toBe(true);
    expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
  }))

});
