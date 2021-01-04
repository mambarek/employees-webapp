import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {OverlayService} from "../../shared/overlay/overlay.service";
import {Employee} from "@angular-it2go/employees-api";
import {
  EmployeesControllerService,
  Project,
  ProjectControllerService
} from "@angular-it2go/project-management-api";
import StatusEnum = Project.StatusEnum;

@Component({
  selector: 'app-edit-project',
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit, AfterViewChecked {

  @ViewChild('projectForm', {static: false}) projectForm: NgForm;
  @ViewChild('saveButton') saveButton: ElementRef;

  project: Project;
  projectStatusList: ProjectStatus[] = [];
  availableEmployees: Employee[] = [];

  selectedAvailableEmployees;
  selectedToRemoveEmployees;

  constructor(private route: ActivatedRoute, private router: Router,
              private projectControllerService: ProjectControllerService,
              private employeesControllerService: EmployeesControllerService,
              private overlayService: OverlayService) {
  }

  ngOnInit(): void {

    this.employeesControllerService.findAllEmployees().subscribe((employees) => {
      this.availableEmployees = employees;
    })

    this.project = <Project>{};
    this.route.params.subscribe(params => {
      const publicId = params['publicId'];
      if(publicId)
        this.initView(publicId);
    });

    this.projectStatusList = this.getStatusList();
  }

  // afterViewChecked is the right hook to change button state
  ngAfterViewChecked(): void {
    this.saveButton.nativeElement.disabled = this.projectForm && this.projectForm.invalid;
  }

  private initView(publicId: string): void {

    if (!publicId) {
      return;
    }

    this.overlayService.showLoader({message: "Loading Project Data ...", minTime: 2});

    this.projectControllerService.getProjectByPublicId(publicId).subscribe(
      response => {
        console.log('Project loaded ', response);
        this.overlayService.hideLoader().then(() => {
          this.project = response;
          this.initAvailableEmployees();
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

    const confirmConfig = {
      title: "Delete Project",
      message: "Do you want to delete this Project?",
      btnText: "Delete",
      btnClass: "btn-danger"
    }

    if (this.project.publicId) {
      this.overlayService.showConfirmation(confirmConfig).then(() =>  {
        this.overlayService.showLoader({message: "Daten werden gelöscht ...", minTime: 5});
        this.projectControllerService.deleteProject(this.project.publicId).subscribe(
          () => {
            this.overlayService.hideLoader().then(() => {
              console.log('Project delete SUCCESS');
              this.router.navigate(["/projects"]);
            });
          },
          error => {
            console.error(error);
            this.overlayService.hideLoader().then(() => {
              this.overlayService.showErrorMessage({})
            });
          }
        );
      });
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

  initAvailableEmployees(){
    if(!this.availableEmployees) return;
    this.availableEmployees = this.availableEmployees.filter(employee => {
      return this.project.assignedEmployees.filter(empl => empl.publicId == employee.publicId).length == 0;
  })
  }

  addButtonDisabled(): boolean {
    return !this.selectedAvailableEmployees || this.selectedAvailableEmployees.length === 0;
  }

  removeButtonDisabled(): boolean {
    return !this.selectedToRemoveEmployees || this.selectedToRemoveEmployees.length === 0;
  }

  addEmployees() {
    if(!this.selectedAvailableEmployees) return;

    let employees = this.availableEmployees.filter(employee =>
      this.selectedAvailableEmployees.indexOf(employee.publicId) > -1);

    this.project.assignedEmployees.push(...employees);

    this.availableEmployees = this.availableEmployees.filter(employee =>
      this.selectedAvailableEmployees.indexOf(employee.publicId) === -1);

    // reset selection
    this.selectedAvailableEmployees = [];
  }

  removeEmployees() {
    if(!this.selectedToRemoveEmployees) return;

    let employees = this.project.assignedEmployees.filter(employee =>
      this.selectedToRemoveEmployees.indexOf(employee.publicId) > -1);

    this.availableEmployees.push(...employees);

    this.project.assignedEmployees = this.project.assignedEmployees.filter(employee =>
      this.selectedToRemoveEmployees.indexOf(employee.publicId) === -1);

    // reset selection
    this.selectedToRemoveEmployees = [];
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

