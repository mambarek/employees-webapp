import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  Employee as IEmployee,
  PersonData as IPersonData,
  EmployeesControllerService,
  Employee
} from "@angular-it2go/employees-api";
import {NgForm} from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import {OverlayService} from "../../shared/overlay/overlay.service";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent implements OnInit {

  @ViewChild('employeeForm', {static: false}) employeeForm: NgForm;
  @ViewChild('saveButton', {static: false}) saveButton: ElementRef;
  employee: IEmployee;
  genders = [{ value: 'MALE', label: 'Male'}, {value: 'FEMALE' , label: 'Female' }];

  myMessageMap = {required: "Bitte geben Sie einen Wert!", minlength: "Der Wert muss mindestens"};

  constructor(private route: ActivatedRoute, private router: Router,
              private employeesService: EmployeesControllerService,
              private overlayService: OverlayService) {

  }

  ngOnInit(): void {
    this.employee = this.createNewEmployee();
    this.route.params.subscribe(params => {
      const publicId = params['publicId'];
      this.initView(publicId);
    });
  }

  // afterViewChecked is the right hook to change button state
  ngAfterViewChecked(): void {
    this.saveButton.nativeElement.disabled = this.employeeForm && this.employeeForm.invalid;
  }

  initView(publicId: string) {

    if (!publicId) {
      this.employee = this.createNewEmployee();
      return;
    }

    this.overlayService.showLoader({message: "Loading employee data ...", minTime: 2});

    this.employeesService.findEmployeeByPublicId(publicId).subscribe(response => {
        this.overlayService.hideLoader().then(() => {
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

  saveEmployee() {
    if (this.employeeForm.invalid) return;

    const confirmConfig = {
      title: "Save data",
      message: "Do you want to save changes?",
      btnText: "Save changes",
      btnClass: "btn-warning"
    }

    this.overlayService.showConfirmation(confirmConfig).then(() =>  {
      this.overlayService.showLoader({message: "Daten werden gespeichert ...", minTime: 5});
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
    employee.data = {} as IPersonData;

    return employee;
  }
}
