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
      snapshot: {
        paramMap: {
          get: () => "25965ca1-7042-40bf-8d71-5c6c926e4337", // represents the car publicId
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [AppModule, CarApiModule ],
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
      fixture.detectChanges();
    });
  }))

  it('should create EditCarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load car', fakeAsync(() => {

    fixture.detectChanges();
    tick();

    const brandInput = fixture.debugElement.query(By.css('#brand'))
    expect(brandInput.nativeElement.value).toEqual(car.brand);
  }))

  it('should load 2 car', async(() => {

    fixture.detectChanges();

    fixture.whenRenderingDone().then(() => {
      const brandInput = fixture.debugElement.query(By.css('#brand'))
      expect(brandInput.nativeElement.value).toEqual(car.brand);
    })
  }))
  /******************************* Test suite End ******************************************/
})
