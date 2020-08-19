import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';
import {EmployeesListComponent} from './employees/employees-list/employees-list.component';
import {CarListComponent} from './cars/car-list/car-list.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'projects', component: ProjectListComponent},
  {path: 'employees', component: EmployeesListComponent},
  {path: 'cars', component: CarListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
