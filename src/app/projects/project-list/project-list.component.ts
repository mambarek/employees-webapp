import {Component, OnInit} from '@angular/core';
import {ProjectControllerService, Project} from '@angular-it2go/project-management-api';
import {
  SearchTemplate as ISearchTemplate,
  Rule as IRule,
  Group as IGroup,
  ProjectTableItem as IProjectTableItem
} from '@angular-it2go/project-management-api';
import {ActivatedRoute, Router} from "@angular/router";
import {Group} from "@angular-it2go/car-fleet-api";
import GroupOpEnum = Group.GroupOpEnum;

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  projectName = '';
  projects: Project[] = [];
  projectTableItems: IProjectTableItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private projectControllerService: ProjectControllerService) {
  }

  ngOnInit(): void {
    console.log('++ ngOnInit() call');
    this.searchProjects();
  }

  searchProjects(): void {
    const rule: IRule = {field: 'name', data: this.projectName, op: 'CONTAINS', type: 'STRING'};
    const group: IGroup = {rules: [rule]};
    group.groupOp = GroupOpEnum.OR;
    const searchTemplate: ISearchTemplate = {filters: group};

    this.projectControllerService.search(searchTemplate).subscribe(response => {
      this.projectTableItems = response.rows;
    }, error => console.error(error));
  }

  addNewProject() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }
}


