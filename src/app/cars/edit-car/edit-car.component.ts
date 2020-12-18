import {
  AfterViewChecked,
  AfterViewInit,
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
import { v4 as uuidv4 } from 'uuid';
import {OverlayService} from "../../shared/overlay/overlay.service";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html'
})
export class EditCarComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('nativeForm', {static: false}) nativeForm: ElementRef;
  @ViewChild('carForm', {static: false}) carForm: NgForm;
  @ViewChild('saveButton') saveButton: ElementRef;
  car: Car;

  fuelTypes = [{id: 'DIESEL', value: 'Diesel'}, {id: 'PETROL', value: 'Petrol'}];
  engineTypes = [{id: 'ELECTRIC', value: 'Electric'} , {id: 'FUEL', value: 'Fuel'} , {id: 'HYBRID', value: 'Hybrid'}];
  carEditorTitle = "";

  constructor(private route: ActivatedRoute, private router: Router,
              private carsService: CarsService,
              private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.car = <Car>{};
    this.route.params.subscribe(params => {
      const publicId = params['publicId'];
      if (publicId) {
        this.initView(publicId);
      }
    });
  }

  // afterViewChecked is the right hook to change button state
  ngAfterViewChecked(): void {
    this.saveButton.nativeElement.disabled = this.carForm && this.carForm.invalid;
  }

  private initView(publicId: string): void {

    this.overlayService.showLoader({message: "Loading car data ...", minTime: 2});
    //this.overlayService.showLoader();

    // otherwise fetch the one and edit it
    this.carsService.getCarByPublicId(publicId).subscribe(
      response => {
        console.log('Car loaded ', response);
        this.car = response;

        this.carEditorTitle = this.car.brand.concat(" ").concat(this.car.model);

        this.overlayService.hideLoader();
      },
      error => {
        console.error(error.message, error);
        this.overlayService.hideLoader().then(() => {
            this.overlayService.showErrorMessage({}).then(() => {
              this.router.navigate(["/cars"]);
            })
        });
      }
    );
  }

  saveCar(): void {
    console.log('-+-+ saveCar() Call -+-+-');
    if(this.carForm.invalid) return;

    const confirmConfig = {
      title: "Save data",
      message: "Do you want to save changes?",
      btnText: "Save changes",
      btnClass: "btn-info"
    }

    this.overlayService.showConfirmation(confirmConfig).then(() =>  {
      this.overlayService.showLoader({message: "Daten werden gespeichert ...", minTime: 5});
      if(this.car.publicId)
        this.updateCar();
      else
        this.createCar();
    });

  }

  /**
   * Its important to push all subscriptions in to subscriptions array
   * @private
   */
  private updateCar(){
    console.log('updateCar call!', this.car);

    this.carsService.updateCar(this.car.publicId, this.car).subscribe(
    response => {
        console.log('++ updateCar() call');
        this.overlayService.hideLoader().then(() => {
          console.log('Saved car SUCCESS', response);
          this.router.navigate(["/cars"]);
        });
      },
    error => {
      console.error(error);
      this.overlayService.hideLoader().then(() => {
          this.overlayService.showErrorMessage({});
      });
      }
    );
  }

  /**
   * Its important to push all subscriptions in to subscriptions array
   * @private
   */
  private createCar(){
    console.log('createCar call!', this.car);
    // may be move this to backend
    this.car.publicId = uuidv4();
    this.car.status = Car.StatusEnum.READY;

    this.carsService.createCar(this.car).subscribe(
    response => {
        this.overlayService.hideLoader().then(() => {
          console.log("Car successfully created", response);
          this.router.navigate(["/cars"]);
        });
    },
    error => {
        console.log("An error occurred while creating car!", error);
        this.overlayService.hideLoader().then(() => {
            this.overlayService.showErrorMessage({})
        });
    });
  }

  deleteCar(): void {
    console.log('deleteCar call!', this.car);

    const confirmConfig = {
      title: "Delete car",
      message: "Do you want to delete this car?",
      btnText: "Delete",
      btnClass: "btn-danger"
    }

    if (this.car.publicId) {
      this.overlayService.showConfirmation(confirmConfig).then(() =>  {
          this.overlayService.showLoader({message: "Daten werden gelöscht ...", minTime: 5});
          this.carsService.deleteCar(this.car.publicId).subscribe(
            () => {
                this.overlayService.hideLoader().then(() => {
                  console.log('Car delete SUCCESS');
                  this.router.navigate(["/cars"]);
                });
            },
            error => {
              console.error(error);
                this.overlayService.hideLoader().then(() => {
                    this.overlayService.showErrorMessage({})
                });
            }
          );
        });
    }
  }

  ngOnDestroy(): void {
    console.log(">>>>>>>>>>> EditCarComponent ngOnDestroy() call!");
    // clean all subscriptions
    //this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectInput(event: Event) {
    console.log("-- Select changed ", event);
  }
}
