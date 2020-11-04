import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProjectControllerService} from '@angular-it2go/project-management-api';
import {ModalComponent} from '../modal/modal.component';
import {CarsService} from "@angular-it2go/car-fleet-api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  projectsCount = 0;
  carsCount = 0;
  private _showProjectModal = false;
  private _showEmployeeModal = false;
  private _showCarModal = false;

  @ViewChild('projectModal') projectModal: ModalComponent;
  @ViewChild('employeeModal') employeeModal: ModalComponent;
  @ViewChild('carModal') carModal: ModalComponent;

  constructor(private projectControllerService: ProjectControllerService, private carsService: CarsService) {
  }

  ngOnInit(): void {
    this.initView();
  }

  ngAfterViewInit(): void {
    this.projectModal.saveEvent.subscribe(() => {
      console.log('++ Save event fired!');
      // here you can validate the input
      // if ok call save and close
      this.showProjectModal = false;
      // else show error to modal
    });

    this.employeeModal.saveEvent.subscribe(() => {
      console.log('++ Save event fired!');
      // here you can validate the input
      // if ok call save and close
      this.showEmployeeModal = false;
      // else show error to modal
    });

    this.carModal.saveEvent.subscribe(() => {
      console.log('++ Save event fired!');
      // here you can validate the input
      // if ok call save and close
      this.showCarModal = false;
      // else show error to modal
    });
  }

  get showProjectModal(): boolean {
    return this._showProjectModal;
  }

  set showProjectModal(value: boolean) {
    this._showProjectModal = value;
    this.projectModal.show = value;
  }

  get showEmployeeModal(): boolean {
    return this._showEmployeeModal;
  }

  set showEmployeeModal(value: boolean) {
    this._showEmployeeModal = value;
    this.employeeModal.show = value;
  }

  get showCarModal(): boolean {
    return this._showCarModal;
  }

  set showCarModal(value: boolean) {
    this._showCarModal = value;
    this.carModal.show = value;
  }

  initView(): void {
    this.projectControllerService.getProjectsCount().subscribe(result => this.projectsCount = result,
      error => console.error(error));

    this.carsService.getCarsCount().subscribe(result => this.carsCount = result,)
  }

}
