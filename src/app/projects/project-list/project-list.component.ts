import { Component, OnInit } from '@angular/core';
import {ProjectControllerService, Project} from '@angular-it2go/project-management-api';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  constructor(private projectControllerService: ProjectControllerService) {}

  ngOnInit(): void {
    this.loadAllProjects();
  }

  private loadAllProjects(): void{
    this.projectControllerService.getAllProjects().subscribe(
      response => {
        this.projects = response;
        console.log('loadAllProjects SUCCESS');
        console.log(response);
        },
      error => console.error(error)
    );
  }
}
