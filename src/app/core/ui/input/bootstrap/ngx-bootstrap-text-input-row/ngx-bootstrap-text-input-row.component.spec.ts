import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {NgxBootstrapTextInputRowComponent} from "./ngx-bootstrap-text-input-row.component";
import {Component, DebugElement, OnInit, ViewChild} from "@angular/core";
import {By} from "@angular/platform-browser";
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  NgModel,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import {CoreModule} from "../../../../core.module";

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule], // we need FormsModule and NgModule so import all at once
      declarations: [ NgxBootstrapTextInputRowComponent ],
      providers: [
        { provide: NgModel, useValue: new FormControl()},
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
    fixture.detectChanges();

    const label = el.query(By.css('label'));
    expect(label.nativeElement.textContent).toEqual('Firstname');
  })

  it('No user input (dirty=false) component should NOT have "is-valid" class',
    waitForAsync(() => {
      component.label = 'Firstname'
      component.value = 'Ali';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const input = el.query(By.css('input'));
        expect(input).toBeTruthy();
        // this line needs zone so put it in async whenStable
        expect(input.nativeElement.value).toBe('Ali');
        expect(input.nativeElement.classList.contains('is-valid')).toBe(false)
      })
    })
  )

  it('After user input (dirty=true) component should have "is-valid" class',
    waitForAsync(() => {
      component.label = 'Firstname'
      component.value = 'Ali';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const input = el.query(By.css('input'));
        expect(input).toBeTruthy();

        input.nativeElement.value = 'Omar';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(input.nativeElement.classList.contains('is-valid')).toBe(true);
      })
    })
  )

  it('(1) dirty && local_invalid component should have "is-invalid" class',
    () => {
      component.label = 'Firstname'
      component.value = 'Ali';

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
    }
  )

  it('(2) should ADD class "is-invalid" when dirty and external control INVALID',
    waitForAsync(() => {
      let ngModel = TestBed.inject(NgModel);
      spyOnProperty(ngModel,"invalid","get").and.returnValue(true);
      spyOnProperty(ngModel,"valid","get").and.returnValue(false);
      component.parentControl = ngModel;
      component.label = 'Firstname'
      component.value = 'Ali';

      fixture.whenStable().then(() => {
        const input = el.query(By.css('input'));
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
      component.label = 'Firstname'
      component.value = 'Ali';
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
    }
  );

  it('!(4) should NOT ADD class "is-invalid" when NOT submitted and NOT dirty and external control INVALID',
    waitForAsync(() => {
      let ngModel = TestBed.inject(NgModel);
      spyOnProperty(ngModel,"invalid","get").and.returnValue(true);
      spyOnProperty(ngModel,"valid","get").and.returnValue(false);
      component.parentControl = ngModel;
      component.label = 'Firstname'

      fixture.whenStable().then(() => {
        const input = el.query(By.css('input'));
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
      component.parentControl = ngModel;
      component.label = 'Firstname'

      spyOnProperty(component,"submitted","get").and.returnValue(true);
      // update component
      fixture.detectChanges();
      const input = el.query(By.css('input'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.classList.contains('is-invalid')).toBe(true);
      expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
    }
  )
  /********************** END NgxBootstrapTextInputRowComponent test suite *****************************************************/

});

@Component({
  selector: 'app-test',
  template: `
    <form ngForm>
            <p>Text: {{text}}</p>
            <ngx-bootstrap-text-input-row
              label="{{label}}" name="firstName"
              [(ngModel)]="text"
              required minlength="3" #compControl="ngModel"
             >
            </ngx-bootstrap-text-input-row>
    </form>
            `
})
export class TestComponent {
  text = "test";
  label = "First name";
  @ViewChild('compControl') compControl: FormControl;

  onSubmit(){
    console.log("Form submitted!");
  }
}

describe('NgxBootstrapTextInputRowComponent Test in Component', () => {
  let fixture1;
  let component;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule( {
      declarations: [TestComponent],
      imports: [CoreModule]
    }).compileComponents().then(() => {
      fixture1 = TestBed.createComponent(TestComponent);
      component = fixture1.componentInstance;
      fixture1.autoDetectChanges(true);
      fixture1.detectChanges();
    });
    }
  ))

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // without fakeAsync tick we become no value in input object
  it('should display the default input, no error is displayed', fakeAsync(() => {
    fixture1.detectChanges();
    expect(component).toBeTruthy();

    tick()

    const input = fixture1.debugElement.query(By.css('input'));
    expect(input.nativeElement.value).toEqual(component.text);

    expect(input.nativeElement.classList.contains('is-invalid')).toBe(false);
    expect(input.nativeElement.classList.contains('is-valid')).toBe(false);
  }))

  // without fakeAsync tick we become no value in input object
  it('minlength validator: input shorter then 3 should show error, length mus be longer then 2', fakeAsync(() => {
    fixture1.detectChanges();
    expect(component).toBeTruthy();

    tick()

    const input = fixture1.debugElement.query(By.css('input'));
    expect(input.nativeElement.value).toEqual(component.text);

    input.nativeElement.value = "BB";
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture1.detectChanges();

    expect(input.nativeElement.classList.contains('is-invalid')).toBe(true);
    expect(input.nativeElement.classList.contains('is-valid')).toBe(false);

    const feedBack = fixture1.debugElement.query(By.css('.invalid-feedback'))
    expect(feedBack.nativeElement.innerText).toEqual(component.label + ' must be at least 3 characters long.');
  }))

  // without fakeAsync tick we become no value in input object
  it('required validator: empty input show invalid and message for required', fakeAsync(() => {
    fixture1.detectChanges();
    expect(component).toBeTruthy();

    tick()

    const input = fixture1.debugElement.query(By.css('input'));
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

@Component({
  selector: 'test-reactive-component',
  template: `
    <form [formGroup]="form">
      <p>Text: {{user.firstName}}</p>
      <p>Form.value: {{form.value | json}}</p>
      <ngx-bootstrap-text-input-row
        [label]="label" name="firstName" formControlName="text"
        maxlength="5"
      ></ngx-bootstrap-text-input-row>
    </form>
  `
})
export class TestInReactiveFormComponent implements OnInit {
  form: FormGroup;
  text = "test";
  label = "First name";
  user = { firstName: "Ali"}

  ngOnInit(){
    this.form = new FormGroup({
      text: new FormControl(this.user.firstName, [Validators.required, Validators.minLength(3)])
    })
  }
}

describe('NgxBootstrapTextInputRowComponent Test in Reactive form', () => {

  let fixture1;
  let component;

  beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule( {
        declarations: [TestInReactiveFormComponent],
        imports: [CoreModule, ReactiveFormsModule],
      }).compileComponents().then(() => {
        fixture1 = TestBed.createComponent(TestInReactiveFormComponent);
        component = fixture1.componentInstance;
        fixture1.autoDetectChanges(true);
        fixture1.detectChanges();
      });
    }
  ));

  it('should create', () => {
    expect(component).toBeTruthy();

    let user = {name: 'bob', email: 'bob@example.com', address: {street: '123', zip: '123'}};

    let uc = {...user, address: {...user.address}};

    uc.name = 'ali';
    uc.address.street = '657';

    console.log('user',user);
    console.log('uc',uc);

  });


})
