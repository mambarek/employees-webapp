import {Component, OnInit, ViewChild} from '@angular/core';
import {Project, ProjectControllerService} from '@angular-it2go/project-management-api';
import {ActivatedRoute, Router} from '@angular/router';
import StatusEnum = Project.StatusEnum;
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @ViewChild('projectForm', {static: false}) projectForm: NgForm;

  project: Project;
  projectStatusList: ProjectStatus[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private projectControllerService: ProjectControllerService) {
  }

  ngOnInit(): void {
    this.initModel();
    this.projectStatusList = this.getStatusList();
  }

  private initModel(): void {
    const publicId: string = this.route.snapshot.params.id;
    // while the getById is async so set a dummy to-do on loading page, otherwise an NP exception is thrown
    this.project = new DummyProjectModel();

    if (!publicId) {
      return;
    } // it mean we create a new to do

    // otherwise fetch the one and edit it
    this.projectControllerService.getProjectByPublicId(publicId).subscribe(
      response => {
        console.log('Project loaded ', response);
        this.project = response;
      },
      error => {
        console.error(error.message, error);
      }
    );
  }

  submitForm(event: Event): void {
    event.preventDefault();
    this.projectForm.ngSubmit.emit();
  }

  saveProject(): void {
    console.log('saveProject call!', this.project);
    if (this.project.publicId) {
      this.projectControllerService.updateProject(this.project.publicId, this.project).subscribe(
        response => {
          console.log('Saved project SUCCESS');
        },
        error => console.error(error)
      );
    } else {
      this.projectControllerService.saveProject(this.project);
    }
  }

  getStatusList(): ProjectStatus[] {
    const projectStatus: Array<ProjectStatus> = [];
    projectStatus.push(new ProjectStatus(StatusEnum.WAITING, 'Is waiting'));
    projectStatus.push(new ProjectStatus(StatusEnum.WORKING, 'On working'));
    projectStatus.push(new ProjectStatus(StatusEnum.FINISHED, 'Is finished'));
    projectStatus.push(new ProjectStatus(StatusEnum.STOPPED, 'Is stopped'));

    return projectStatus;
  }
}

class ProjectStatus {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

class DummyProjectModel implements Project {
  publicId: string;
}