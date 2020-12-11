import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {CoreModule} from "../../../../core.module";
import {FormControl, NgControl} from "@angular/forms";
import {NgxBootstrapSelectRowComponent} from "./ngx-bootstrap-select-row.component";
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
describe('NgxBootstrapSelectRowComponent', () => {

  let component: NgxBootstrapSelectRowComponent;
  let fixture: ComponentFixture<NgxBootstrapSelectRowComponent>;
  let el: DebugElement;
  let ngControl: any;
  const genders = [{value: '', label: ''}, {value: 'MALE', label: 'Male'}, {
    value: 'FEMALE',
    label: 'Female'
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [NgxBootstrapSelectRowComponent],
      providers: [
        {provide: NgControl, useValue: new FormControl()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapSelectRowComponent);
    component = fixture.componentInstance;
    component.items = genders;
    component.itemKey = 'value';
    component.itemLabel = 'label';
    fixture.detectChanges();
    el = fixture.debugElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should have items', () => {
    const select = el.query(By.css('select'));
    expect(select).toBeTruthy();
    const options = select.queryAll(By.css('option'));
    expect(options.length).toEqual(3)
    console.log("Default selection", select.nativeElement.selectedOptions[0]);
  })

  it('should select default value "Male", no "is-valid" class added, dirty == false',
    async(() => {
      component.value = 'MALE';
      fixture.detectChanges();

      fixture.whenStable().then(() => { // block needs zone
        let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
        expect(select.selectedIndex).toEqual(1);
        expect(select.options[select.selectedIndex].value).toEqual("MALE");
        expect(select.options[select.selectedIndex].label).toEqual("Male");

        expect(select.selectedOptions[0].value).toEqual("MALE");
        expect(select.classList.contains('is-valid')).toBe(false);
      })
    })
  );

  it('should change the value, add "is-valid" class, dirty == true', () => {
    let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
    select.value = select.options[2].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    let text = select.options[select.selectedIndex].label;
    expect(text).toBe('Female');
    expect(select.classList.contains('is-valid')).toBe(true);
    expect(select.classList.contains('is-invalid')).toBe(false);
  });

  it('(1) dirty && local_invalid component should have "is-invalid" class',() => {
      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      expect(select).toBeTruthy();
      select.value = select.options[2].value;
      select.dispatchEvent(new Event('change'));

      // set localControl state to invalid
      spyOnProperty(component.localControl,"valid","get").and.returnValue(false);
      spyOnProperty(component.localControl,"invalid","get").and.returnValue(true);

      fixture.detectChanges();

      expect(select.classList.contains('is-invalid')).toBe(true)
      expect(select.classList.contains('is-valid')).toBe(false)
    }
  );

  it('(2) should ADD class "is-invalid" when dirty and external control INVALID',
    () => {
      ngControl = TestBed.inject(NgControl);
      spyOnProperty(ngControl, "invalid", "get").and.returnValue(true);
      spyOnProperty(ngControl, "valid", "get").and.returnValue(false);
      component.control = ngControl;
      fixture.detectChanges();

      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      select.value = select.options[2].value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      let text = select.options[select.selectedIndex].label;
      expect(text).toBe('Female');
      expect(select.classList.contains('is-invalid')).toBe(true);
      expect(select.classList.contains('is-valid')).toBe(false);
    }
  );

  it('(3) submitted && local invalid should ADD "is-invalid" class',
    () => {
      // set localControl state to invalid
      spyOnProperty(component.localControl,"valid","get").and.returnValue(false);
      spyOnProperty(component.localControl,"invalid","get").and.returnValue(true);
      // set component as submitted
      spyOnProperty(component,"submitted","get").and.returnValue(true);
      // update component
      fixture.detectChanges();
      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      expect(select).toBeTruthy();
      expect(select.classList.contains('is-invalid')).toBe(true);
      expect(select.classList.contains('is-valid')).toBe(false);
    }
  );

  it('should NOT add class "is-invalid" when NOT submitted and NOT dirty and external control INVALID',
    () => {
      ngControl = TestBed.inject(NgControl);
      spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
      spyOnProperty(ngControl,"valid","get").and.returnValue(false);
      component.control = ngControl;

      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      expect(select.classList.contains('is-invalid')).toBe(false);
      expect(select.classList.contains('is-valid')).toBe(false);
    }
  );

  it('(4) should ADD class "is-invalid" when submitted and NOT dirty and external control INVALID',
    () => {
      ngControl = TestBed.inject(NgControl);
      spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
      spyOnProperty(ngControl,"valid","get").and.returnValue(false);
      component.control = ngControl;

      spyOnProperty(component,"submitted","get").and.returnValue(true);
      fixture.detectChanges();
      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      expect(select.classList.contains('is-invalid')).toBe(true);
      expect(select.classList.contains('is-valid')).toBe(false);
    }
  );

  /********************************* END Test *********************************************/
})
