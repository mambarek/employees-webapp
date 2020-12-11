import {Component, OnInit} from '@angular/core';
import {ProjectControllerService, Project} from '@angular-it2go/project-management-api';
import {
  SearchTemplate as ISearchTemplate,
  Rule as IRule,
  Group as IGroup,
  ProjectTableItem as IProjectTableItem
} from '@angular-it2go/project-management-api';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  projectName = '';
  projects: Project[] = [];
  projectTableItems: IProjectTableItem[] = [];

  constructor(private projectControllerService: ProjectControllerService) {
  }

  ngOnInit(): void {
    console.log('++ ngOnInit() call');
    this.searchProjects();
  }

  // not in use
  private loadAllProjects(): void {
    // if we have search
    if (this.projectName) {
      this.searchProjects();
      return;
    }

    this.projectControllerService.getAllProjects().subscribe(
      response => {
        this.projects = response;
        response.forEach(project => {
          const projectTableItem: IProjectTableItem = {
            name: project.name,
            budget: project.budget,
            description: project.description,
            finishDate: project.finishDate,
            planedFinishDate: project.planedFinishDate,
            planedStartDate: project.planedStartDate,
            publicId: project.publicId,
            startDate: project.startDate,
            status: project.status
          };
          this.projectTableItems.push(projectTableItem);
        });
        console.log('loadAllProjects SUCCESS');
        console.log(response);
      },
      error => console.error(error)
    );
  }

  searchProjects(): void {
    const rule: IRule = {field: 'name', data: this.projectName, op: 'CONTAINS', type: 'STRING'};
    const group: IGroup = {rules: [rule]};
    const searchTemplate: ISearchTemplate = {filters: group};

    this.projectControllerService.search(searchTemplate).subscribe(response => {
      this.projectTableItems = response.rows;
    }, error => console.error(error));
  }
}


