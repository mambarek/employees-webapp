import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Employee, EmployeesControllerService} from "@angular-it2go/employees-api";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  @ViewChild('employeeForm', {static: false}) employeeForm: NgForm;
  @ViewChild('saveButton', {static: false}) saveButton: ElementRef;
  employee: Employee;

  constructor(private route: ActivatedRoute, private router: Router, private employeesService: EmployeesControllerService) {

  }

  ngOnInit(): void {
    this.initView();
  }

  initView() {
    const publicId: string = this.route.snapshot.params.id;

    if (!publicId) {
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

  submitForm() {
    if (this.employeeForm.invalid) return;
    this.employeesService.updateEmploy(this.employee.publicId, this.employee).subscribe(
      response => {
        console.log('Saved employee SUCCESS');
        this.employee = response;
      }, error => {
        console.error(error)
      })
  }

  deleteEmployee() {

  }

  saveEmployee() {

  }
}
