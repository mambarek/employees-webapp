import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {EditCarComponent} from "./edit-car.component";
import {AppModule} from "../../app.module";
import {ApiModule as CarApiModule, CarsService} from "@angular-it2go/car-fleet-api";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {CARS} from "../../../../test/carfleet/Cars";
import {By} from "@angular/platform-browser";

describe('EditCarComponent', () => {

  let component: EditCarComponent;
  let fixture: ComponentFixture<EditCarComponent>;
  let carsService: any;
  const car = CARS[0];

  beforeEach(async(() => {
    // create cars service spy and provide it
    const carsServiceSpy = jasmine.createSpyObj('CarsService',
      ['getCarByPublicId', 'updateCar', 'createCar', 'deleteCar']);
    const activatedRoute = {
      params: of({publicId: "25965ca1-7042-40bf-8d71-5c6c926e4337"}),
      snapshot: {
        paramMap: {
          get: () => "25965ca1-7042-40bf-8d71-5c6c926e4337", // represents the car publicId
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [AppModule, CarApiModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: CarsService, useValue: carsServiceSpy}
      ]
    })
    .compileComponents().then(() => {
      // mock the search, return only BMW car
      carsService = TestBed.inject(CarsService);
      carsService.getCarByPublicId.and.returnValue(of(car));

      fixture = TestBed.createComponent(EditCarComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges(true);
      fixture.detectChanges();
    });
  }))

  it('should create EditCarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load car', async(() => {

    fixture.whenStable().then(() => {
      const backLink = fixture.debugElement.query(By.css('#actions > .container > .row > .col-md-3 > a'));
      expect(backLink).toBeTruthy("Back link should be present");
      expect(backLink.nativeElement.href).toContain('/cars');

      const saveButton = fixture.debugElement.query(By.css('#saveCar'));
      expect(saveButton).toBeTruthy("Save button should be present");
      expect(saveButton.nativeElement.disabled).toBeFalsy("Save button should be enabled");

      const deleteButton = fixture.debugElement.query(By.css('#deleteCar'));
      expect(deleteButton).toBeTruthy("Delete button should be present");
      expect(deleteButton.nativeElement.disabled).toBeFalsy("Delete button should be enabled");

      const brandInput = fixture.debugElement.query(By.css('#brand'))
      expect(brandInput.nativeElement.value).toEqual(car.brand);

      // check mandatory fields, label has '*' at the end
      const brandLabel = fixture.debugElement.query(By.css('[name="brand"] > .form-group > label'))
      expect(brandLabel.nativeElement.innerText).toContain('*');
    })
  }))

  it('Delete brand should disable "Save Changes" button', async(() => {

    fixture.whenStable().then(() => {
      const brandInput = fixture.debugElement.query(By.css('#brand'))
      brandInput.nativeElement.value = '';
      brandInput.nativeElement.dispatchEvent(new Event('input'));

      const saveButton = fixture.debugElement.query(By.css('#saveCar'));
      expect(saveButton).toBeTruthy("Save button should be present");
      console.log(saveButton);
      expect(saveButton.nativeElement.disabled).toBeTruthy("Save button should be disabled");
    })
  }))


  /******************************* Test suite End ******************************************/
})

describe('EditCarComponent new Car', () =>{

  let component: EditCarComponent;
  let fixture: ComponentFixture<EditCarComponent>;

  beforeEach(async(() => {
    // create cars service spy and provide it
    const carsServiceSpy = jasmine.createSpyObj('CarsService',
      ['getCarByPublicId', 'updateCar', 'createCar', 'deleteCar']);

    const activatedRoute = {params: of({}) };

    TestBed.configureTestingModule({
      imports: [AppModule, CarApiModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: CarsService, useValue: carsServiceSpy}
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(EditCarComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges(true);
      fixture.detectChanges();
    });
  }));

  it('It should hide "Delete Car" button for new car', async(() => {

    fixture.whenStable().then(() => {
      const deleteButton = fixture.debugElement.query(By.css('#deleteCar'));
      expect(deleteButton).toBeFalsy("Delete button should not be present for new Car");

      const saveButton = fixture.debugElement.query(By.css('#saveCar'));
      expect(saveButton).toBeTruthy("Save button should be present");
      console.log(saveButton);
      expect(saveButton.nativeElement.disabled).toBeTruthy("Save button should be disabled");
    })
  }))
})
