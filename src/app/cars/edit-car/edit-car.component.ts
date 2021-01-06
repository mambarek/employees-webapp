import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Car} from "@angular-it2go/car-fleet-api";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {OverlayService} from "../../shared/overlay/overlay.service";
import {CarFleetAppService} from "../../services/car-fleet-app.service";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html'
})
export class EditCarComponent implements OnInit, AfterViewChecked {

  @ViewChild('carForm', {static: false}) carForm: NgForm;
  @ViewChild('saveButton') saveButton: ElementRef;
  car: Car;

  fuelTypes = [{id: 'DIESEL', value: 'Diesel'}, {id: 'PETROL', value: 'Petrol'}];
  engineTypes = [{id: 'ELECTRIC', value: 'Electric'} , {id: 'FUEL', value: 'Fuel'} , {id: 'HYBRID', value: 'Hybrid'}];
  carEditorTitle = "";

  constructor(private route: ActivatedRoute, private router: Router,
              private carFleetAppService: CarFleetAppService,
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

    this.carFleetAppService.findCarByPublicId(publicId).subscribe(
      response => {
        console.log('Car loaded ', response);
        this.overlayService.hideLoader().then(closed => {
          this.car = response;
          this.carEditorTitle = this.car.brand.concat(" ").concat(this.car.model);
        });
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

  private updateCar(){
    console.log('updateCar call!', this.car);

    this.carFleetAppService.updateCar(this.car).subscribe(
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

  private createCar(){
    console.log('createCar call!', this.car);

    this.carFleetAppService.createCar(this.car).subscribe(
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
          this.carFleetAppService.deleteCar(this.car).subscribe(
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

  selectInput(event: Event) {
    console.log("-- Select changed ", event);
  }
}
