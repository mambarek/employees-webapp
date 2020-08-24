import {Component, OnInit} from '@angular/core';
import {ProjectControllerService} from '@angular-it2go/project-management-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projectsCount = 0;

  constructor(private projectControllerService: ProjectControllerService) {
  }

  ngOnInit(): void {
    this.initView();
  }

  initView(): void {
    this.projectControllerService.getProjectsCount().subscribe(result => this.projectsCount = result,
      error => console.error(error));
  }
}
