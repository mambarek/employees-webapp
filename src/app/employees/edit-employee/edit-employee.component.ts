import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  Employee as IEmployee,
  PersonData as IPersonData,
  EmployeesControllerService, ProjectsControllerService, Project
} from "@angular-it2go/employees-api";
import {NgForm} from "@angular/forms";
import {OverlayService} from "../../shared/overlay/overlay.service";
import {NgbAccordion, NgbPanelChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent implements OnInit, AfterViewInit {

  @ViewChild('acc') accordion: NgbAccordion;
  @ViewChild('addressForm') addressForm: NgForm;
  @ViewChild('personDataForm', {static: false}) personDataForm: NgForm;
  @ViewChild('saveButton', {static: false}) saveButton: ElementRef;
  employee: IEmployee;
  genders = [{ value: 'MALE', label: 'Male'}, {value: 'FEMALE' , label: 'Female' }];

  myMessageMap = {required: "Bitte geben Sie einen Wert!", minlength: "Der Wert muss mindestens"};
  projects$: Observable<Project[]>;
  projects: Project[] = [];

  publicId: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private employeesService: EmployeesControllerService,
              private projectsControllerService: ProjectsControllerService,
              private overlayService: OverlayService) {
      this.projects$ = projectsControllerService.findAllProjects();
  }

  ngOnInit(): void {
    this.employee = this.createNewEmployee();
    this.route.params.subscribe(params => {
      this.publicId = params['publicId'];
      this.projects$.subscribe(projects => {
        console.log(projects);
        this.projects = projects;
      })
      this.initView();
    });
  }

  ngAfterViewInit() {
    if(!this.publicId)  this.accordion.expandAll();

  }

  // afterViewChecked is the right hook to change button state after every change
  ngAfterViewChecked(): void {
    let personDataInValid = this.personDataForm ? this.personDataForm.invalid : false;
    let addressInValid = this.addressForm ? this.addressForm.invalid : false;

    this.saveButton.nativeElement.disabled = personDataInValid || addressInValid;
  }

  initView() {
    if (!this.publicId) {
      this.employee = this.createNewEmployee();
      return;
    }

    this.overlayService.showLoader({message: "Loading employee data ...", minTime: 2});

    this.employeesService.findEmployeeByPublicId(this.publicId).subscribe(response => {
      console.log("--> Loaded employee can hide loader", response);
        this.overlayService.hideLoader().then(() => {
          console.log("-- Loader closed");
          this.employee = response;
        });
      },
      error => {
        console.error(error.message, error);
        this.overlayService.hideLoader().then(() => {
          this.overlayService.showErrorMessage({}).then(() => {
            this.router.navigate(["/employees"]);
          })
        });
      }
    )
  }

  deleteEmployee() {
    console.log('deleteEmployee call!', this.employee);

    const confirmConfig = {
      title: "Delete employee",
      message: "Do you want to delete this employee?",
      btnText: "Delete",
      btnClass: "btn-danger"
    }

    if (this.employee.publicId) {
      this.overlayService.showConfirmation(confirmConfig).then(() =>  {

        this.overlayService.showLoader({message: "Daten werden gelöscht ...", minTime: 5});

        this.employeesService.deleteEmployee(this.employee.publicId).subscribe(
          () => {
            this.overlayService.hideLoader().then(() => {
              console.log('Employee delete SUCCESS');
              this.router.navigate(["/employees"]);
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

  validateAccordion($event: NgbPanelChangeEvent){
    if($event.panelId === 'person-data' && $event.nextState === false && this.personDataForm){
      this.personDataForm.onSubmit(null);
      if(this.personDataForm && this.personDataForm.invalid){
        $event.preventDefault();
      }
    }

    if($event.panelId === 'address-data' && $event.nextState === false && this.addressForm){
      this.addressForm.onSubmit(null);
      if(this.addressForm.invalid){
        $event.preventDefault();
      }
    }
  }

  submitForms(){
    if(this.personDataForm) this.personDataForm.onSubmit(null);
    if(this.addressForm) this.addressForm.onSubmit(null);
  }

  saveEmployee() {

    const confirmConfig = {
      title: "Save data",
      message: "Do you want to save changes?",
      btnText: "Save changes",
      btnClass: "btn-warning"
    }

    this.overlayService.showConfirmation(confirmConfig).then(() =>  {
      this.overlayService.showLoader({message: "Daten werden gespeichert ...", minTime: 0.5});
        if(this.employee.publicId)
          this.updateEmployee();
        else
          this.createEmployee();
    });
  }

  updateEmployee(){
    this.employeesService.updateEmploy(this.employee.publicId, this.employee).subscribe(
      response => {
        console.log('Update employee SUCCESS');
        this.overlayService.hideLoader().then(() => {
          console.log("## redirect to List ##");
          this.router.navigate(["/employees"]);
        });
      }, error => {
          console.error(error);
          this.overlayService.hideLoader().then(() => {
            this.overlayService.showErrorMessage({});
          });
      })
  }

  createEmployee(){
    this.employeesService.saveNewEmployee(this.employee).subscribe(
      response => {
        this.overlayService.hideLoader().then(() => {
          console.log("Employee successfully created", response);
          this.router.navigate(["/employees"]);
        });
      }, error => {
        console.log("An error occurred while creating employee!", error);
        this.overlayService.hideLoader().then(() => {
          this.overlayService.showErrorMessage({})
        });
      })
  }

  private createNewEmployee(): IEmployee {
    const employee: IEmployee = {} as IEmployee;
    employee.data = {address: {}} as IPersonData;

    return employee;
  }
}
