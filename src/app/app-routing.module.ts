import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';
import {EmployeesListComponent} from './employees/employees-list/employees-list.component';
import {CarListComponent} from './cars/car-list/car-list.component';
import {ErrorComponent} from './error/error.component';
import {ProjectDetailsComponent} from './projects/project-details/project-details.component';
import {EditCarComponent} from "./cars/edit-car/edit-car.component";
import {LoginComponent} from "./auth/login/login.component";
import {EditEmployeeComponent} from "./employees/edit-employee/edit-employee.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'projects', children: [
      { path: '', component: ProjectListComponent },
      { path: 'new', component: ProjectDetailsComponent },
      { path: 'details/:publicId', component: ProjectDetailsComponent }
    ]
  },
  {
    path: 'employees', children: [
      { path: '', component: EmployeesListComponent },
      { path: 'new', component: EditEmployeeComponent },
      { path: 'details/:publicId', component: EditEmployeeComponent }
    ]
  },
  {
    path: 'cars', children: [
      { path: '', component: CarListComponent },
      { path: 'new', component: EditCarComponent },
      { path: 'details/:publicId', component: EditCarComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
