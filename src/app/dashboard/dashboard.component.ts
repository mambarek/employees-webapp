import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectControllerService} from '@angular-it2go/project-management-api';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projectsCount = 0;
  private _showProjectModal = false;
  private _showEmployeeModal = false;
  private _showCarModal = false;

  @ViewChild('projectModal') projectModal: ModalComponent;
  @ViewChild('employeeModal') employeeModal: ModalComponent;

  constructor(private projectControllerService: ProjectControllerService) {
  }

  ngOnInit(): void {
    this.initView();
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
  }

  initView(): void {
    this.projectControllerService.getProjectsCount().subscribe(result => this.projectsCount = result,
      error => console.error(error));
  }

  showProjectModalDialog(event: Event): void {
    console.log('--showProjectModalDialog() call!');
    event.preventDefault();
    this._showProjectModal = !this._showProjectModal;
  }
}
