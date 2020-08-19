import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { EditCarComponent } from './cars/edit-car/edit-car.component';
import { CarListComponent } from './cars/car-list/car-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    EditProjectComponent,
    ProjectListComponent,
    EmployeesListComponent,
    EditEmployeeComponent,
    DashboardComponent,
    EditCarComponent,
    CarListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
