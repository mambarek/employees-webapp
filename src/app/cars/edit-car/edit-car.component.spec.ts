import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EditCarComponent} from "./edit-car.component";
import {AppModule} from "../../app.module";
import {ApiModule as CarApiModule, CarsService} from "@angular-it2go/car-fleet-api";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

describe('EditCarComponent', () => {

  let component: EditCarComponent;
  let fixture: ComponentFixture<EditCarComponent>;

  beforeEach(async(() => {
    // create cars service spy and provide it
    const carsServiceSpy = jasmine.createSpyObj('CarService',
      ['getCarByPublicId', 'updateCar', 'createCar', 'deleteCar']);

    TestBed.configureTestingModule({
      imports: [AppModule, CarApiModule ],
      providers: [
        {provide: CarsService, useValue: carsServiceSpy}
      ]
    })
    .compileComponents();
  }))
})
