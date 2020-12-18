import {Component, OnInit, ViewChild} from '@angular/core';
import {Project as IProject, ProjectControllerService} from '@angular-it2go/project-management-api';
import {ActivatedRoute, Router} from '@angular/router';
import StatusEnum = IProject.StatusEnum;
import {NgForm} from '@angular/forms';
import {OverlayService} from "../../shared/overlay/overlay.service";

@Component({
  selector: 'app-edit-project',
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {

  @ViewChild('projectForm', {static: false}) projectForm: NgForm;

  project: IProject;
  projectStatusList: ProjectStatus[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private projectControllerService: ProjectControllerService,
              private overlayService: OverlayService) {
  }

  ngOnInit(): void {
    this.project = <IProject>{};
    this.route.params.subscribe(params => {
      const publicId = params['publicId'];
      if(publicId)
        this.initView(publicId);
    });

    this.projectStatusList = this.getStatusList();
  }

  private initView(publicId: string): void {
    //const publicId: string = this.route.snapshot.params.id;
    // while the getById is async so set a dummy to-do on loading page, otherwise an NP exception is thrown
    this.project = {publicId: ''};

    if (!publicId) {
      return;
    } // it mean we create a new to do

    this.overlayService.showLoader({message: "Loading Project Data ...", minTime: 2});
    // otherwise fetch the one and edit it
    this.projectControllerService.getProjectByPublicId(publicId).subscribe(
      response => {
        console.log('Project loaded ', response);
        this.overlayService.hideLoader().then(() => {
          this.project = response;
        })
      },
      error => {
        console.error(error.message, error);
        this.overlayService.hideLoader().then(() => {
          this.overlayService.showErrorMessage({}).then(() => {
            this.router.navigate(["/projects"]);
          })
        });
      }
    );
  }

  saveProject(): void {
    if(this.projectForm.invalid) return;

    const confirmConfig = {
      title: "Save data",
      message: "Do you want to save changes?",
      btnText: "Save changes",
      btnClass: "btn-success"
    }

    this.overlayService.showConfirmation(confirmConfig).then(() =>  {
      this.overlayService.showLoader({message: "Daten werden gespeichert ...", minTime: 5});
      if(this.project.publicId)
        this.updateProject();
      else
        this.createProject();
    });
  }

  updateProject(): void {
    this.projectControllerService.updateProject(this.project.publicId, this.project).subscribe(
      response => {
        this.overlayService.hideLoader().then(() => {
          console.log('Saved project SUCCESS', response);
          this.router.navigate(["/projects"]);
        });
      },
      error => {
        console.error(error);
        this.overlayService.hideLoader().then(() => {
          this.overlayService.showErrorMessage({});
        });
      }
    );
  };

  createProject(): void {
    this.projectControllerService.saveProject(this.project).subscribe(
      response => {
        this.overlayService.hideLoader().then(() => {
          console.log('Create project SUCCESS', response);
          this.router.navigate(["/projects"]);
        });
      },
        error => {
          console.error(error);
          this.overlayService.hideLoader().then(() => {
            this.overlayService.showErrorMessage({});
          });
        }
    );
  };

  deleteProject(): void {
    console.log('deleteProject call!', this.project);
    if (this.project.publicId) {
      this.projectControllerService.deleteProject(this.project.publicId).subscribe(
        response => {
          console.log('Project delete SUCCESS');
        },
        error => console.error(error)
      );
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

