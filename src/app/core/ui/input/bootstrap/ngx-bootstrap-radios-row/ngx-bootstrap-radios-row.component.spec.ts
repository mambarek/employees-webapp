import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {FormControl, NgControl} from "@angular/forms";
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
fdescribe('NgxBootstrapRadiosRowComponent', () => {

  let component: NgxBootstrapRadiosRowComponent;
  let fixture: ComponentFixture<NgxBootstrapRadiosRowComponent>;
  const genders = [{value: 'MALE', label: 'Male'}, {value: 'FEMALE', label: 'Female' }];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [CoreModule], // we need FormsModule and NgModule so import all at once
      declarations: [ NgxBootstrapRadiosRowComponent ],
      providers: [
        { provide: NgControl, useValue: new FormControl()},
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
    async(() => { // with fakeAsync not working
      fixture.autoDetectChanges(true);
      component.value = 'MALE';
      fixture.whenStable().then(() => {
        expect(component.localControl.value).toEqual('MALE');

        let radios = fixture.debugElement.queryAll(By.css('.custom-radio'));
        expect(radios.length).toEqual(2);
        expect(radios[0].nativeElement.classList.contains('is-invalid')).toBe(false, "should not have is-invalid class");
        expect(radios[0].nativeElement.classList.contains('is-valid')).toBe(false, "should not have is-valid class");
      })
    })
  );

  it('(1) submitted && external_invalid = true should ADD "is-invalid" class',
    async(() => { // with fakeAsync not working
      let ngControl = TestBed.inject(NgControl);
      spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
      spyOnProperty(ngControl,"valid","get").and.returnValue(false);
      component.control = ngControl;

      fixture.whenStable().then(() => {

        let radios = fixture.debugElement.queryAll(By.css('.custom-radio'));
        expect(radios.length).toEqual(2);
        spyOnProperty(component,"submitted","get").and.returnValue(true);
        // update component
        fixture.detectChanges();
        const radio = fixture.debugElement.query(By.css('.custom-radio'));
        expect(radio).toBeTruthy();
        expect(radio.nativeElement.classList.contains('is-invalid')).toBe(true, "should have is-invalid class");
        expect(radio.nativeElement.classList.contains('is-valid')).toBe(false, "should not have is-valid class");
      })
    })
  );

  it('(2) dirty && external_invalid = true should ADD "is-invalid" class',
    async(() => { // with fakeAsync not working
      // mock external control
      let ngControl = TestBed.inject(NgControl);
      spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
      spyOnProperty(ngControl,"valid","get").and.returnValue(false);
      component.control = ngControl;

      fixture.whenStable().then(() => {
        // dirty: make click om the label to activate a radio (css ::before label ::after)
        const labels = fixture.debugElement.queryAll(By.css('.custom-control-label'));
        expect(labels).toBeTruthy();
        labels[0].nativeElement.click();
        labels[0].nativeElement.dispatchEvent(new Event('click'));

        fixture.detectChanges();
        console.log(component.localControl);
        const radios = fixture.debugElement.queryAll(By.css('.custom-radio'));
        expect(radios[0].nativeElement.classList.contains('is-invalid')).toBe(true, "0 should have is-invalid class");
        expect(radios[0].nativeElement.classList.contains('is-valid')).toBe(false, "0 should not have is-valid class");
      })
    })
  );

  it('(3) dirty && external_valid = true should ADD "is-valid" class',
    async(() => { // with fakeAsync not working
      // mock external control
      let ngControl = TestBed.inject(NgControl);
      spyOnProperty(ngControl,"invalid","get").and.returnValue(false);
      spyOnProperty(ngControl,"valid","get").and.returnValue(true);
      component.control = ngControl;

      fixture.whenStable().then(() => {
        // dirty: make click om the label to activate a radio (css ::before label ::after)
        const labels = fixture.debugElement.queryAll(By.css('.custom-control-label'));
        expect(labels).toBeTruthy();
        labels[0].nativeElement.click();
        labels[0].nativeElement.dispatchEvent(new Event('click'));

        fixture.detectChanges();
        console.log(component.localControl);
        const radios = fixture.debugElement.queryAll(By.css('.custom-radio'));
        expect(radios[0].nativeElement.classList.contains('is-invalid')).toBe(false, "0 should not have is-invalid class");
        expect(radios[0].nativeElement.classList.contains('is-valid')).toBe(true, "0 should have is-valid class");
      })
    })
  );
})
