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
  subscriptions: Subscription [] = [];

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

    //this.overlayService.showLoader({message: "Loading car data ...", minTime: 2});
    this.overlayService.showLoader();

    // otherwise fetch the one and edit it
    const subscription = this.carsService.getCarByPublicId(publicId).subscribe(
      response => {
        console.log('Car loaded ', response);
        this.car = response;

        this.carEditorTitle = this.car.brand.concat(" ").concat(this.car.model)
                          .concat(" ").concat(this.car.status);

        this.overlayService.hideLoader();
      },
      error => {
        this.overlayService.hideLoader();
        console.error(error.message, error);
      }
    );

    this.subscriptions.push(subscription);
  }

  saveCar(): void {
    if(this.carForm.invalid) return;

    const confirmConfig = {
      title: "Save data",
      message: "Do you want to save changes?",
      btnText: "Save changes",
      btnClass: "btn-info"
    }

    this.subscriptions.push(
      this.overlayService.showConfirmation(confirmConfig).subscribe(
        decision =>  {
        this.overlayService.showLoader({message: "Daten werden gespeichert ...", minTime: 5});
        if(this.car.publicId)
          this.updateCar();
        else
          this.createCar();
    }));

  }

  /**
   * Its important to push all subscriptions in to subscriptions array
   * @private
   */
  private updateCar(){
    console.log('updateCar call!', this.car);

    this.carsService.updateCar(this.car.publicId, this.car).subscribe(
      response => {
        this.subscriptions.push(
          this.overlayService.hideLoader().subscribe(closed => {
            console.log('Saved car SUCCESS', response);
            this.router.navigate(["/cars"]);
          }));
      },
      error => {
        console.error(error);
        this.subscriptions.push(
          this.overlayService.hideLoader().subscribe(closed => {
            this.subscriptions.push(
              this.overlayService.showErrorMessage({}).subscribe(closed => {})
            )
          })
        );
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
        this.subscriptions.push(
          this.overlayService.hideLoader().subscribe(closed => {
            console.log("Car successfully created", response);
            this.router.navigate(["/cars"]);
          }));
    },
        error => {
      console.log("An error occurred while creating car!", error);
          this.subscriptions.push(
            this.overlayService.hideLoader().subscribe(closed => {
              this.subscriptions.push(
                this.overlayService.showErrorMessage({}).subscribe(closed => {})
              )
            })
          );
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
      this.subscriptions.push(
        this.overlayService.showConfirmation(confirmConfig).subscribe(
          decision =>  {
            this.overlayService.showLoader({message: "Daten werden gelöscht ...", minTime: 5});
            this.subscriptions.push(
              this.carsService.deleteCar(this.car.publicId).subscribe(
                response => {
                  this.subscriptions.push(
                    this.overlayService.hideLoader().subscribe(closed => {
                      console.log('Car delete SUCCESS');
                      this.router.navigate(["/cars"]);
                    })
                  );
                },
                error => {
                  console.error(error);
                  this.subscriptions.push(
                    this.overlayService.hideLoader().subscribe(closed => {
                      this.subscriptions.push(
                        this.overlayService.showErrorMessage({}).subscribe(closed => {})
                      )
                    })
                  );
                }
            ));
          })
      );
    }
  }

  ngOnDestroy(): void {
    // clean all subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectInput(event: Event) {
    console.log("-- Select changed ", event);
  }
}
