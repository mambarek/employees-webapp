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
import {ErrorComponent} from './error/error.component';
import {ModalComponent} from './modal/modal.component';
import {environment} from '../environments/environment';
import {CoreModule} from "./core/core.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {SharedModule} from "./shared/shared.module";
import {OAuthModule} from "angular-oauth2-oidc";
import {ProjectsApiModule, BASE_PATH as projectBasePath} from "./apis/it-2go/project-management-api";
import {CarApiModule, BASE_PATH as carBasePath} from "./apis/it-2go/car-fleet-api";
import {EmployeesApiModule, BASE_PATH as employeesBasePath} from "./apis/it-2go/employees-api";

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
    EditCarComponent,
    ErrorComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.carfleetApiUrl, environment.employeesApiUrl, environment.projectsApiUrl],
        sendAccessToken: true
      }
    }),
    SharedModule,
    ProjectsApiModule,
    NgbModule,
    CarApiModule,
    EmployeesApiModule,
    CoreModule
  ],
  providers: [
    {provide: projectBasePath, useValue: environment.projectsApiUrl},
    {provide: employeesBasePath, useValue: environment.employeesApiUrl},
    {provide: carBasePath, useValue: environment.carfleetApiUrl}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
