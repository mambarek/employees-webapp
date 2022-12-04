import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import GroupOpEnum = Group.GroupOpEnum;
import {ProjectsAppService} from "../../services/projects-app.service";
import {Project, ProjectTableItem} from "../../apis/it-2go/project-management-api";
import {Group, Rule as IRule, SearchTemplate} from "../../apis/it-2go/project-management-api";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  projectName = '';
  projects: Project[] = [];
  projectTableItems: ProjectTableItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private projectsAppService: ProjectsAppService) {
  }

  ngOnInit(): void {
    console.log('++ ngOnInit() call');
    this.searchProjects();
  }

  searchProjects(): void {
    const rule: IRule = {field: 'name', data: this.projectName, op: 'CONTAINS', type: 'STRING'};
    const group: Group = {rules: [rule]};
    group.groupOp = GroupOpEnum.Or;
    const searchTemplate: SearchTemplate = {filters: group};

    this.projectsAppService.search(searchTemplate).subscribe(response => {
      this.projectTableItems = response.rows;
    }, error => console.error(error));
  }

  addNewProject() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }
}


