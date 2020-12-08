import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Car, CarsService} from "@angular-it2go/car-fleet-api";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm, NgModel} from "@angular/forms";
import {Subscription} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('nativeForm', {static: false}) nativeForm: ElementRef;
  @ViewChild('carForm', {static: false}) carForm: NgForm;
  @ViewChild('saveButton') saveButton: ElementRef;
  car: Car;
  subscriptions: Subscription [] = [];

  fuelTypes = [{id: 'DISEL', value: 'DIESEL'}, {id: 'PETROL', value: 'PETROL'}];
  testText;
  carEditorTitle = "";

  constructor(private route: ActivatedRoute, private router: Router, private carsService: CarsService) { }

  ngOnInit(): void {
    console.log("SaveButton", this.saveButton);
  }

  ngAfterViewInit(): void {
    this.initModel();
    console.log("nativeForm", this.nativeForm);
    console.log("carForm", this.carForm);
    console.log("SaveButton", this.saveButton);
    //this.saveButton.nativeElement.disabled = true;


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
        this.carEditorTitle = this.car.brand.concat(" ").concat(this.car.model).concat(" ").concat(this.car.status);
      },
      error => {
        console.error(error.message, error);
      }
    );

    this.subscriptions.push(subscription);
  }

  saveCar(): void { console.log("SaveButton", this.saveButton);
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

  selectInput(event: Event) {
    console.log("-- Select changed ", event);
  }
}
