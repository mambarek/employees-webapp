import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Car, CarsService} from "@angular-it2go/car-fleet-api";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm, NgModel} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('carForm', {static: false}) carForm: NgForm;
  @ViewChild('saveButton', {static: false}) saveButton: ElementRef;
  car: Car;
  subscriptions: Subscription [] = [];

  fuelTypes = [{id: 'DISEL', value: 'DIESEL'}, {id: 'PETROL', value: 'PETROL'}];

  constructor(private route: ActivatedRoute, private router: Router, private carsService: CarsService) { }

  ngOnInit(): void {
    this.initModel();
  }

  private initModel(): void {
    const publicId: string = this.route.snapshot.params.id;

    if (!publicId) {
      return;
    } // it mean we create a new to do

    // otherwise fetch the one and edit it
    const subscription = this.carsService.getCarByPublicId(publicId).subscribe(
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
          this.car = response;
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

  ngAfterViewInit(): void {
  }

  selectInput(event: Event) {
    console.log("-- Select changed ", event);
  }
}
