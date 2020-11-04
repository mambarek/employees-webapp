import { Component, OnInit } from '@angular/core';
import {
  Employee, EmployeesSearchControllerService,
  EmployeeTableItem,
  EmployeeTableItemList,
  Group
} from '@angular-it2go/employees-api';
import {
  Group as IGroup,
  Rule as IRule,
  SearchTemplate as ISearchTemplate
} from "@angular-it2go/car-fleet-api";
import GroupOpEnum = Group.GroupOpEnum;

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  itemsCount = 0;
  searchText = '';
  //employees: EmployeeTableItem[] = [];
  employeeTableItemList: EmployeeTableItemList;

  constructor(private employeesSearchService: EmployeesSearchControllerService) { }

  ngOnInit(): void {
    this.searchEmployees();
  }

  searchEmployees(): void{
    const firstNameRule: IRule = {field: 'firstName', data: this.searchText, op: IRule.OpEnum.CONTAINS, type: IRule.TypeEnum.STRING};
    const lastNameRule: IRule = {field: 'lastName', data: this.searchText, op: IRule.OpEnum.CONTAINS, type: IRule.TypeEnum.STRING};
    const group: IGroup = {rules: [firstNameRule, lastNameRule]};
    group.groupOp = GroupOpEnum.OR;
    //const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'model', orderDirection: 'ASC'};
    const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'firstName'};

    this.employeesSearchService.searchEmployees(searchTemplate).subscribe(response => {
      this.employeeTableItemList = response;
    }, error => console.error(error))
  }
}
