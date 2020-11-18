import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Car, CarsService} from "@angular-it2go/car-fleet-api";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm, NgModel} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit, OnDestroy {

  @ViewChild('carForm', {static: false}) carForm: NgForm;
  car: Car;
  subscriptions: Subscription [] = [];

  fuelTypes = [{id: 'DISEL', value: 'DIESEL'}, {id: 'PETROL', value: 'PETROL'}];

  constructor(private route: ActivatedRoute, private router: Router, private carsService: CarsService) { }

  ngOnInit(): void {
    this.initModel();
  }

  private initModel(): void {
    const publicId: string = this.route.snapshot.params.id;
    // since the getById is async so set a dummy to-do on loading page, otherwise an NP exception is thrown
    this.car = {
      brand: "",
      color: "",
      engineType: undefined,
      manufacturingDate: "",
      model: "",
      publicId: ""
    };

    if (!publicId) {
      return;
    } // it mean we create a new to do

    // otherwise fetch the one and edit it
    var subscription = this.carsService.getCarByPublicId(publicId).subscribe(
      response => {
        console.log('Car loaded ', response);
        this.car = response;
      },
      error => {
        console.error(error.message, error);
      }
    );

    this.subscriptions.push(subscription);
  }

  submitForm(event: Event): void {
    event.preventDefault();

      this.carForm.ngSubmit.emit();
  }

  saveCar(): void {
    if(this.carForm.invalid) return;
    console.log('saveCar call!', this.car);
    if (this.car.publicId) {
      this.carsService.updateCar(this.car.publicId, this.car).subscribe(
        response => {
          console.log('Saved car SUCCESS');
        },
        error => console.error(error)
      );
    } else {
      this.carsService.createCar(this.car);
    }
  }

  deleteCar(): void {
    console.log('deleteCar call!', this.car);
    if (this.car.publicId) {
      this.carsService.deleteCar(this.car.publicId).subscribe(
        response => {
          console.log('Car delete SUCCESS');
        },
        error => console.error(error)
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onInputChange(element: HTMLElement, model: any) {
    console.log(model);
    //element.st
  }
}
