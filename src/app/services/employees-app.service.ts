import { Injectable } from '@angular/core';
import {
  EmployeesControllerService,
  EmployeesSearchControllerService,
  ProjectsControllerService
} from "../apis/it-2go/employees-api";
import {Observable} from "rxjs";
import {
  Employee,
  EmployeeTableItemList,
  Project,
  SearchTemplate
} from "../apis/it-2go/employees-api/model/models";

/**
 * The Facade for Employees App
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeesAppService {

  constructor(private employeesService: EmployeesControllerService,
              private projectsControllerService: ProjectsControllerService,
              private employeesSearchService: EmployeesSearchControllerService) {
  }

  public findEmployeeByPublicId(publicId: string): Observable<Employee>{
    return this.employeesService.findEmployeeByPublicId(publicId);
  }

  public saveNewEmployee(employee: Employee): Observable<Employee>{
    return this.employeesService.saveNewEmployee(employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee>{
    return this.employeesService.updateEmployee(employee.publicId, employee);
  }

  public deleteEmployee(employee: Employee): Observable<any>{
    return this.employeesService.deleteEmployee(employee.publicId);
  }

  public findAllProjects(): Observable<Array<Project>>{
    return this.projectsControllerService.findAllProjects();
  }

  public searchEmployees(searchTemplate: SearchTemplate): Observable<EmployeeTableItemList>{
    return this.employeesSearchService.searchEmployees(searchTemplate);
  }
}
