import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import {MenuComponent} from './menu/menu.component';
import {ProjectDetailsComponent} from './projects/project-details/project-details.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { EditCarComponent } from './cars/edit-car/edit-car.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ApiModule as ProjectsApiModule, BASE_PATH} from '@angular-it2go/project-management-api';
import {ErrorComponent} from './error/error.component';
import {RouteReuseStrategy} from '@angular/router';
import {ModalComponent} from './modal/modal.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    ProjectDetailsComponent,
    ProjectListComponent,
    EmployeesListComponent,
    EditEmployeeComponent,
    DashboardComponent,
    EditCarComponent,
    CarListComponent,
    ErrorComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ProjectsApiModule
  ],
  providers: [{provide: BASE_PATH, useValue: environment.projectsApiUrl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
