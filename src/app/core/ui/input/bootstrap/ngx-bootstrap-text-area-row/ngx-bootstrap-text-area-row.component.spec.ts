import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Component, DebugElement, ViewChild} from "@angular/core";
import {By} from "@angular/platform-browser";
import {FormControl, FormsModule, NgControl, NgModel} from "@angular/forms";
import {CoreModule} from "../../../../core.module";
import {NgxBootstrapTextAreaRowComponent} from "./ngx-bootstrap-text-area-row.component";

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
describe('NgxBootstrapTextAreaRowComponent', () => {
  let component: NgxBootstrapTextAreaRowComponent;
  let fixture: ComponentFixture<NgxBootstrapTextAreaRowComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule], // we need FormsModule and NgModule so import all at once
      declarations: [ NgxBootstrapTextAreaRowComponent ],
      providers: [
        { provide: NgModel, useValue: new FormControl()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapTextAreaRowComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Component should have a label', () => {
    component.label = 'Description'
    component.value = 'This is test description';
    fixture.detectChanges();

    const label = el.query(By.css('label'));
    expect(label.nativeElement.textContent).toEqual('Description');
  })

  it('No user input (dirty=false) component should NOT have "is-valid" class',
    async(() => {
      component.label = 'Description'
      component.value = 'This is test description';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const input = el.query(By.css('textarea'));
        expect(input).toBeTruthy();
        // this line needs zone so put it in async whenStable
        expect(input.nativeElement.value).toBe('This is test description');
        expect(input.nativeElement.classList.contains('is-valid')).toBe(false)
      })
    })
  )

  it('After user input (dirty=true) component should have "is-valid" class',
    async(() => {
      component.label = 'Description'
      component.value = 'This is test description';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const input = el.query(By.css('textarea'));
        expect(input).toBeTruthy();

        input.nativeElement.value = 'Omar'
        input.nativeElement.dispatchEvent(new Event('input'))
        fixture.detectChanges();

        expect(input.nativeElement.classList.contains('is-valid')).toBe(true)
      })
    })
  )

  it('(1) dirty && local_invalid component should have "is-invalid" class',
    () => {
      component.label = 'Description'
      component.value = 'This is test description';

      const input = el.query(By.css('textarea'));
      expect(input).toBeTruthy();

      input.nativeElement.value = 'This is a new test description'
      input.nativeElement.dispatchEvent(new Event('input'))

      // set localControl state to invalid
      spyOnProperty(component.localControl,"valid","get").and.returnValue(false);
      spyOnProperty(component.localControl,"invalid","get").and.returnValue(true);

      fixture.detectChanges();

      expect(input.nativeElement.classList.contains('is-invalid')).toBe(true)
      expect(input.nativeElement.classList.contains('is-valid')).toBe(false)
    }
  )

  it('(2) should ADD class "is-invalid" when dirty and external control INVALID',
    async(() => {
      let ngModel = TestBed.inject(NgModel);
      spyOnProperty(ngModel,"invalid","get").and.returnValue(true);
      spyOnProperty(ngModel,"valid","get").and.returnValue(false);
      component.parentNgModel = ngModel;
      component.label = 'Description'
      component.value = 'This is test description';

      fixture.whenStable().then(() => {
        const input = el.query(By.css('textarea'));
        expect(input).toBeTruthy();

        input.nativeElement.value = 'Omar';
        input.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(input.nativeElement.classList.contains('is-invalid')).toBe(true);
        expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
      })
    })
  )

  it('(3) submitted && local invalid should ADD "is-invalid" class',() => {
      component.label = 'Description'
      component.value = 'This is test description';
      // set localControl state to invalid
      spyOnProperty(component.localControl,"valid","get").and.returnValue(false);
      spyOnProperty(component.localControl,"invalid","get").and.returnValue(true);
      // set component as submitted
      spyOnProperty(component,"submitted","get").and.returnValue(true);
      // update component
      fixture.detectChanges();
      const input = el.query(By.css('textarea'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.classList.contains('is-invalid')).toBe(true);
      expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
    }
  );

  it('!(4) should NOT ADD class "is-invalid" when NOT submitted and NOT dirty and external control INVALID',
    async(() => {
      let ngModel = TestBed.inject(NgModel);
      spyOnProperty(ngModel,"invalid","get").and.returnValue(true);
      spyOnProperty(ngModel,"valid","get").and.returnValue(false);
      component.parentNgModel = ngModel;
      component.label = 'Description'

      fixture.whenStable().then(() => {
        const input = el.query(By.css('textarea'));
        expect(input).toBeTruthy();
        expect(input.nativeElement.classList.contains('is-invalid')).toBe(false);
        expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
      })
   })
  )

  it('(4) should ADD class "is-invalid" when submitted and NOT dirty and external control INVALID',
  () => {
      let ngModel = TestBed.inject(NgModel);
      spyOnProperty(ngModel,"invalid","get").and.returnValue(true);
      spyOnProperty(ngModel,"valid","get").and.returnValue(false);
      component.parentNgModel = ngModel;
      component.label = 'Description'

      spyOnProperty(component,"submitted","get").and.returnValue(true);
      // update component
      fixture.detectChanges();
      const input = el.query(By.css('textarea'));
      expect(input).toBeTruthy();

      expect(input.nativeElement.classList.contains('is-invalid'))
      .toBe(true, "invalid should be true");

      expect(input.nativeElement.classList.contains('is-valid'))
      .toBe(false, "valid should be false");
    }
  )
  /********************** END NgxBootstrapTextAreaRowComponent test suite *****************************************************/

});

@Component({
  selector: 'app-test',
  template: `
            <ngx-bootstrap-text-area-row
              label={{label}} name="description"
              [(ngModel)]="text"
              required minlength="3" #compControl="ngModel"
             >
            </ngx-bootstrap-text-area-row>
            `
})
export class TestComponent {
  text = "This is a test description";
  label = "Description";
  @ViewChild('compControl') compControl: FormControl;

  onSubmit(){
    console.log("Form submitted!");
  }
}

describe('NgxBootstrapTextAreaRowComponent test in Component', () => {
  let fixture1;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule( {
      declarations: [TestComponent],
      imports: [CoreModule, FormsModule]
    }).compileComponents().then(() => {
      fixture1 = TestBed.createComponent(TestComponent);
      component = fixture1.componentInstance;
      fixture1.detectChanges();
    });
    }
  ))

  // without fakeAsync tick we become no value in input object
  it('should display the default input, no error is displayed', fakeAsync(() => {
    fixture1.detectChanges();
    expect(component).toBeTruthy();

    tick()

    const input = fixture1.debugElement.query(By.css('#description'));
    expect(input.nativeElement.value).toEqual(component.text);

    expect(input.nativeElement.classList.contains('is-invalid')).toBe(false);
    expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
  }))

  // without fakeAsync tick we become no value in input object
  it('minlength validator: input shorter then 3 should show error, length must be longer then 2',
    fakeAsync(() => {
      fixture1.detectChanges();
      expect(component).toBeTruthy();

      tick()

      const input = fixture1.debugElement.query(By.css('#description'));
      expect(input.nativeElement.value).toEqual(component.text);

      input.nativeElement.value = "BB";
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture1.detectChanges();

      expect(input.nativeElement.classList.contains('is-invalid')).toBe(true);
      expect(input.nativeElement.classList.contains('is-valid')).toBe(false);

      const feedBack = fixture1.debugElement.query(By.css('.invalid-feedback'))
      expect(feedBack.nativeElement.innerText)
      .toEqual(component.label + ' must be at least 3 characters long.');
  }))

  // without fakeAsync tick we become no value in input object
  it('required validator: empty input show invalid and message for required', fakeAsync(() => {
    fixture1.detectChanges();
    expect(component).toBeTruthy();

    tick()

    const input = fixture1.debugElement.query(By.css('#description'));
    expect(input.nativeElement.value).toEqual(component.text);

    input.nativeElement.value = "";
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture1.detectChanges();

    expect(input.nativeElement.classList.contains('is-invalid')).toBe(true);
    expect(input.nativeElement.classList.contains('is-valid')).toBe(false);

    const feedBack = fixture1.debugElement.query(By.css('.invalid-feedback'))
    expect(feedBack.nativeElement.innerText).toEqual(component.label + ' is required.');
  }))

})
