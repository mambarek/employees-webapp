import { Component, OnInit } from '@angular/core';
import {EmployeeTableItemList, Group} from '@angular-it2go/employees-api';
import {Group as IGroup, Rule as IRule, SearchTemplate as ISearchTemplate} from "@angular-it2go/car-fleet-api";
import GroupOpEnum = Group.GroupOpEnum;
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeesAppService} from "../../services/employees-app.service";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html'
})
export class EmployeesListComponent implements OnInit {

  itemsCount = 0;
  searchText = '';
  //employees: EmployeeTableItem[] = [];
  employeeTableItemList: EmployeeTableItemList;

  constructor(private router: Router, private route: ActivatedRoute, private employeesAppService: EmployeesAppService) { }

  ngOnInit(): void {
    this.searchEmployees();
  }

  searchEmployees(): void{
    let group: IGroup = {rules: []};
    if(this.searchText) {
      const firstNameRule: IRule = {
        field: 'firstName',
        data: this.searchText,
        op: IRule.OpEnum.CONTAINS,
        type: IRule.TypeEnum.STRING
      };
      const lastNameRule: IRule = {
        field: 'lastName',
        data: this.searchText,
        op: IRule.OpEnum.CONTAINS,
        type: IRule.TypeEnum.STRING
      };
      group = {rules: [firstNameRule, lastNameRule]};
      group.groupOp = GroupOpEnum.OR;
    }
    //const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'model', orderDirection: 'ASC'};
    //const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'firstName'};
    const searchTemplate: ISearchTemplate = {filters: group};

    this.employeesAppService.searchEmployees(searchTemplate).subscribe(response => {
      this.employeeTableItemList = response;
    }, error => console.error(error))
  }

  addNewEmployee() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }
}
