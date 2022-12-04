import { Injectable } from '@angular/core';
import {CarSearchService, CarsService} from "../apis/it-2go/car-fleet-api";
import {Car, CarSearchResult, SearchTemplate} from "../apis/it-2go/car-fleet-api/model/models";
import {Observable} from "rxjs";

/**
 * The Facade for Car Fleet App
 */
@Injectable({
  providedIn: 'root'
})
export class CarFleetAppService {

  constructor(private carSearchService: CarSearchService, private carsService: CarsService) { }

  public search(searchTemplate: SearchTemplate): Observable<CarSearchResult>{
    return this.carSearchService.search(searchTemplate);
  }

  public findCarByPublicId(publicId: string): Observable<Car>{
    return this.carsService.findCarByPublicId(publicId);
  }

  public createCar(car: Car): Observable<Car>{
    return this.carsService.createCar(car);
  }

  public updateCar(car: Car): Observable<Car>{
    return this.carsService.updateCar(car.publicId, car);
  }

  public deleteCar(car: Car): Observable<Car>{
    return this.carsService.deleteCar(car.publicId);
  }
}
