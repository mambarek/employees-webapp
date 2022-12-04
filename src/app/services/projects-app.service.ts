import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {
  Project,
  ProjectControllerService,
  SearchResultProjectTableItem
} from "../apis/it-2go/project-management-api";
import {Employee, EmployeesControllerService, SearchTemplate} from "../apis/it-2go/employees-api";

/**
 * The Facade for Projects App
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectsAppService {

  constructor(private projectControllerService: ProjectControllerService,
              private employeesControllerService: EmployeesControllerService) { }

  public findAllEmployees(): Observable<Array<Employee>>{
    return this.employeesControllerService.findAllEmployees();
  }

  public getProjectByPublicId(publicId: string): Observable<Project>{
    return this.projectControllerService.getProjectByPublicId(publicId);
  }

  public saveProject(project: Project): Observable<Project>{
    return this.projectControllerService.saveProject(project);
  }

  public updateProject(project: Project): Observable<Project>{
    return this.projectControllerService.updateProject(project.publicId, project);
  }

  public deleteProject(project: Project): Observable<any>{
    return this.projectControllerService.deleteProject(project.publicId);
  }

  public search(searchTemplate: SearchTemplate): Observable<SearchResultProjectTableItem>{
    return this.projectControllerService.search(searchTemplate);
  }
}
