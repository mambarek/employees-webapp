import {Component, OnInit, ViewChild} from '@angular/core';
import {Car, CarsService} from "@angular-it2go/car-fleet-api";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  @ViewChild('carForm', {static: false}) carForm: NgForm;
  car: Car;

  constructor(private route: ActivatedRoute, private router: Router, private carsService: CarsService) { }

  ngOnInit(): void {
    this.initModel();
  }

  private initModel(): void {
    const publicId: string = this.route.snapshot.params.id;
    // while the getById is async so set a dummy to-do on loading page, otherwise an NP exception is thrown
    this.project = {publicId: ''};

    if (!publicId) {
      return;
    } // it mean we create a new to do

    // otherwise fetch the one and edit it
    this.carsService.getCarByPublicId(publicId).subscribe(
      response => {
        console.log('Car loaded ', response);
        this.car = response;
      },
      error => {
        console.error(error.message, error);
      }
    );
  }

  submitForm(event: Event): void {
    event.preventDefault();
    this.carForm.ngSubmit.emit();
  }

  saveCar(): void {
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

  deleteProject(): void {
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
}
