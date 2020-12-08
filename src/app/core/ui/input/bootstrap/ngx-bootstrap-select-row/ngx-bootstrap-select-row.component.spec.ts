import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {CoreModule} from "../../../../core.module";
import {FormControl, NgControl} from "@angular/forms";
import {NgxBootstrapSelectRowComponent} from "./ngx-bootstrap-select-row.component";
import {By} from "@angular/platform-browser";

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

  it('should select default value "Male", no "is-valid" class added, dirty == false', async(() => {
    component.value = 'MALE';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      expect(select.selectedIndex).toEqual(1);
      expect(select.options[select.selectedIndex].value).toEqual("MALE");
      expect(select.options[select.selectedIndex].label).toEqual("Male");

      expect(select.selectedOptions[0].value).toEqual("MALE");
      expect(select.classList.contains('is-valid')).toBe(false);
    })
  }));

  it('should change the value manually, add "is-valid" class, dirty == true', async(() => {
    fixture.whenStable().then(() => {
      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      console.log("print select", select);
      select.value = select.options[2].value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      let text = select.options[select.selectedIndex].label;
      expect(text).toBe('Female');
      expect(select.classList.contains('is-valid')).toBe(true);
      expect(select.classList.contains('is-invalid')).toBe(false);
    });
  }));

  it('should add class "is-invalid" when dirty and external control invalid', async(() => {

    ngControl = TestBed.inject(NgControl);
    spyOnProperty(ngControl, "invalid", "get").and.returnValue(true);
    spyOnProperty(ngControl, "valid", "get").and.returnValue(false);
    component.control = ngControl;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      console.log("print select", select);
      select.value = select.options[2].value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      let text = select.options[select.selectedIndex].label;
      expect(text).toBe('Female');
      console.log(select.classList);
      expect(select.classList.contains('is-invalid')).toBe(true);
      expect(select.classList.contains('is-valid')).toBe(false);
    });
  }));

  it('should NOT add class "is-invalid" when NOT submitted and NOT dirty and external control INVALID',
    fakeAsync(() => {
      ngControl = TestBed.inject(NgControl);
      spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
      spyOnProperty(ngControl,"valid","get").and.returnValue(false);
      component.control = ngControl;

      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      expect(select.classList.contains('is-invalid')).toBe(false);
      expect(select.classList.contains('is-valid')).toBe(false);
    })
  );

  it('should ADD class "is-invalid" when submitted and NOT dirty and external control INVALID',
    fakeAsync(() => {
      ngControl = TestBed.inject(NgControl);
      spyOnProperty(ngControl,"invalid","get").and.returnValue(true);
      spyOnProperty(ngControl,"valid","get").and.returnValue(false);
      component.control = ngControl;

      spyOnProperty(component,"submitted","get").and.returnValue(true);
      fixture.detectChanges();
      let select: HTMLSelectElement = el.query(By.css('select')).nativeElement;
      expect(select.classList.contains('is-invalid')).toBe(true);
      expect(select.classList.contains('is-valid')).toBe(false);
    })
  );


})
