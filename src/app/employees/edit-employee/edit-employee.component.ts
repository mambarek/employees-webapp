import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Employee as IEmployee, PersonData as IPersonData, EmployeesControllerService} from "@angular-it2go/employees-api";
import {NgForm} from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';

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

  constructor(private route: ActivatedRoute, private router: Router, private employeesService: EmployeesControllerService) {

  }

  ngOnInit(): void {
    this.initView();
  }

  initView() {
    const publicId: string = this.route.snapshot.params.id;

    if (!publicId) {
      this.employee = EditEmployeeComponent.createNewEmployee();
      return;
    } // it mean we create a new to do

    this.employeesService.findEmployeeByPublicId(publicId).subscribe(response => {
        this.employee = response;
      },
      error => {
        console.error(error.message, error)
      }
    )
  }

  deleteEmployee() {

  }

  saveEmployee() {
    if (this.employeeForm.invalid) return;
    if(this.employee.publicId) {
      this.employeesService.updateEmploy(this.employee.publicId, this.employee).subscribe(
        response => {
          console.log('Update employee SUCCESS');
          this.employee = response;
        }, error => {
          console.error(error)
        })
    } else {
      this.employee.publicId = uuidv4();
      this.employee.createdBy = uuidv4();
      this.employee.createdAt = new Date().getTime().toString();
      this.employeesService.saveNewEmployee(this.employee).subscribe(
        response => {
          console.log('Create new employee SUCCESS');
          this.employee = response;
        }, error => {
          console.error(error)
        })
    }
  }

  private static createNewEmployee(): IEmployee {
    const employee: IEmployee = {} as IEmployee;
    employee.data = {} as IPersonData;

    return employee;
  }
}
