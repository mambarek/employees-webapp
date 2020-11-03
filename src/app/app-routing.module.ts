import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';
import {EmployeesListComponent} from './employees/employees-list/employees-list.component';
import {CarListComponent} from './cars/car-list/car-list.component';
import {ErrorComponent} from './error/error.component';
import {ProjectDetailsComponent} from './projects/project-details/project-details.component';
import {EditCarComponent} from "./cars/edit-car/edit-car.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {
    path: 'projects', children: [
      {path: '', component: ProjectListComponent},
      {path: 'details/:id', component: ProjectDetailsComponent}
    ]
  },
  {path: 'employees', component: EmployeesListComponent},
  {path: 'cars', component: CarListComponent},
  {
    path: 'cars', children: [
      {path: '', component: CarListComponent},
      {path: 'details/:id', component: EditCarComponent}
    ]
  },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
