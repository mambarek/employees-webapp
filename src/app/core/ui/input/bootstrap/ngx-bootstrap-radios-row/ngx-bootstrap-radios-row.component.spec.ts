import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import {FormControl, NgControl, NgModel} from "@angular/forms";
import {NgxBootstrapRadiosRowComponent} from "./ngx-bootstrap-radios-row.component";
import {CoreModule} from "../../../../core.module";
import {By} from "@angular/platform-browser";

/**
 * Validation cases

 [class.is-invalid]="(radioControl.dirty || submitted) && externalControlInvalid"
 [class.is-valid]="radioControl.dirty && externalControlValid"

 is-invalid
 1) submitted && external_invalid = true
 2) dirty && external_invalid = true
 3) dirty && external_valid = true
 */
describe('NgxBootstrapRadiosRowComponent', () => {

  let component: NgxBootstrapRadiosRowComponent;
  let fixture: ComponentFixture<NgxBootstrapRadiosRowComponent>;
  const genders = [{value: 'MALE', label: 'Male'}, {value: 'FEMALE', label: 'Female' }];

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [CoreModule], // we need FormsModule and NgModule so import all at once
      declarations: [ NgxBootstrapRadiosRowComponent ],
      providers: [
        { provide: NgModel, useValue: new FormControl()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapRadiosRowComponent);
    component = fixture.componentInstance;
    component.label = 'Gender'
    component.items = genders;
    component.invalidText = 'Please select a Gender';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('Component should have a label', () => {
    const label = fixture.debugElement.query(By.css('label'));
    expect(label.nativeElement.textContent).toEqual('Gender');
  })

  it('should select default value "Male", no "is-valid" class added, dirty == false',
    waitForAsync(() => {
      fixture.autoDetectChanges(true);
      component.value = 'MALE';
      fixture.whenStable().then(() => { // block needs zone
        expect(component.localControl.value).toEqual('MALE');

        let radios = fixture.debugElement.queryAll(By.css('.custom-radio'));
        expect(radios.length).toEqual(2);
        expect(radios[0].nativeElement.classList.contains('is-invalid')).toBe(false, "should not have is-invalid class");
        expect(radios[0].nativeElement.classList.contains('is-valid')).toBe(false, "should not have is-valid class");
      })
    })
  );

  it('(1) submitted && external_invalid = true should ADD "is-invalid" class',() => { // with fakeAsync not working
      let ngModel = TestBed.inject(NgModel);
      spyOnProperty(ngModel,"invalid","get").and.returnValue(true);
      spyOnProperty(ngModel,"valid","get").and.returnValue(false);
      component.parentNgModel = ngModel;

      let radios = fixture.debugElement.queryAll(By.css('.custom-radio'));
      expect(radios.length).toEqual(2);
      spyOnProperty(component,"submitted","get").and.returnValue(true);
      // update component
      fixture.detectChanges();
      const radio = fixture.debugElement.query(By.css('.custom-radio'));
      expect(radio).toBeTruthy();
      expect(radio.nativeElement.classList.contains('is-invalid')).toBe(true, "should have is-invalid class");
      expect(radio.nativeElement.classList.contains('is-valid')).toBe(false, "should not have is-valid class");
  });

  it('(2) dirty && external_invalid = true should ADD "is-invalid" class',() => {
     // mock external control
     let ngModel = TestBed.inject(NgModel);
     spyOnProperty(ngModel, "invalid", "get").and.returnValue(true);
     spyOnProperty(ngModel, "valid", "get").and.returnValue(false);
     component.parentNgModel = ngModel;

     // dirty: make click om the label to activate a radio (css ::before label ::after)
     const labels = fixture.debugElement.queryAll(By.css('.custom-control-label'));
     expect(labels).toBeTruthy();
     labels[0].nativeElement.click();
     labels[0].nativeElement.dispatchEvent(new Event('click'));

     fixture.detectChanges();
     const radios = fixture.debugElement.queryAll(By.css('.custom-radio'));
     expect(radios[0].nativeElement.classList.contains('is-invalid')).toBe(true, "0 should have is-invalid class");
     expect(radios[0].nativeElement.classList.contains('is-valid')).toBe(false, "0 should not have is-valid class");
   });

  it('(3) dirty && external_valid = true should ADD "is-valid" class',() => {
      // mock external control
      let ngModel = TestBed.inject(NgModel);
      spyOnProperty(ngModel,"invalid","get").and.returnValue(false);
      spyOnProperty(ngModel,"valid","get").and.returnValue(true);
      component.parentNgModel = ngModel;

      // dirty: make click on the label to activate a radio (css ::before label ::after)
      const labels = fixture.debugElement.queryAll(By.css('.custom-control-label'));
      expect(labels).toBeTruthy();
      labels[0].nativeElement.click();
      labels[0].nativeElement.dispatchEvent(new Event('click'));

      fixture.detectChanges();
      const radios = fixture.debugElement.queryAll(By.css('.custom-radio'));
      expect(radios[0].nativeElement.classList.contains('is-invalid')).toBe(false, "0 should not have is-invalid class");
      expect(radios[0].nativeElement.classList.contains('is-valid')).toBe(true, "0 should have is-valid class");
    });

  /******************************* END Tests ***************************************************/
})
