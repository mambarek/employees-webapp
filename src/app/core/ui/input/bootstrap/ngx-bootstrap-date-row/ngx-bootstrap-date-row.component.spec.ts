import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBootstrapDateRowComponent } from './ngx-bootstrap-date-row.component';
import {CoreModule} from "../../../../core.module";
import {FormControl, NgControl} from "@angular/forms";
import {NgbInputDatepicker, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {By} from "@angular/platform-browser";

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
describe('NgxBootstrapDateRowComponent', () => {
  let component: NgxBootstrapDateRowComponent;
  let fixture: ComponentFixture<NgxBootstrapDateRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, NgbModule],
      declarations: [NgxBootstrapDateRowComponent],
      providers: [{provide: NgControl, useValue: new FormControl()}]
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

  it('No user input (dirty=false) component should NOT have "is-valid" class',
    async(() => {
      component.label = 'Birthdate'
      component.value = '2020-07-15';
      component.invalidText = 'Please give a valid date yyyy-MM-dd';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const input = fixture.debugElement.query(By.css('input'));
        expect(input).toBeTruthy();
        expect(input.nativeElement.value).toBe('2020-07-15');
        expect(input.nativeElement.classList.contains('is-valid')).toBe(false)
      })
    })
  )

  it('dirty && localControl valid && externalControl valid, should ADD class "is-valid"',
    () => {
      const input = fixture.debugElement.query(By.css('input'));
      expect(input).toBeTruthy();
      input.nativeElement.value = '2019-02-25';
      input.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();
      expect(input.nativeElement.value).toBe('2019-02-25');
      expect(input.nativeElement.classList.contains('is-valid')).toBe(true)
  });

  it('dirty && localControl INVALID && externalControl valid, should ADD class "is-invalid"',
    () => {
      const input = fixture.debugElement.query(By.css('input'));
      expect(input).toBeTruthy();
      input.nativeElement.value = 'Test';
      input.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();
      expect(input.nativeElement.value).toBe('Test');
      expect(input.nativeElement.classList.contains('is-valid')).toBe(false)
      expect(input.nativeElement.classList.contains('is-invalid')).toBe(true)
  })

  it('dirty && localControl valid && externalControl INVALID, should ADD class "is-invalid"',
    () => {
      let ngControl = TestBed.inject(NgControl);
      spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
      spyOnProperty(ngControl,"valid","get").and.returnValue(false);
      component.control = ngControl;

      const input = fixture.debugElement.query(By.css('input'));
      expect(input).toBeTruthy();
      input.nativeElement.value = '2019-02-25';
      input.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();
      expect(input.nativeElement.value).toBe('2019-02-25');
      expect(input.nativeElement.classList.contains('is-valid')).toBe(false)
      expect(input.nativeElement.classList.contains('is-invalid')).toBe(true)
    }
  );


  it('should show the Datepicker and select "2020-01-01" as date, "is-valid" is added',() => {
      // set well defined start month and year
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
      dpInput.startDate = {year: 2020, month:1, day: 1};

      // click on the input to open Datepicker
      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.click();

      // you can open picker manually not with click e.g above
      //dpInput.open();
      //fixture.detectChanges();

      // select a date clicking on a date
      fixture.nativeElement.querySelectorAll('.ngb-dp-day')[2].click();  // 1 JAN 2020
      fixture.detectChanges();

      expect(input.nativeElement.value).toEqual('2020-01-01');
      expect(input.nativeElement.classList.contains('is-valid')).toBe(true);
      expect(input.nativeElement.classList.contains('is-invalid')).toBe(false);
  });


/*********************** END Tests **********************************************************/
});
