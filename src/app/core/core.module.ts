import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgxBootstrapTextInputRowComponent} from './ui/input/bootstrap/ngx-bootstrap-text-input-row/ngx-bootstrap-text-input-row.component';
import {NgxBootstrapTextAreaRowComponent} from './ui/input/bootstrap/ngx-bootstrap-text-area-row/ngx-bootstrap-text-area-row.component';
import {NgxBootstrapSelectRowComponent} from './ui/input/bootstrap/ngx-bootstrap-select-row/ngx-bootstrap-select-row.component';
import {NgxBootstrapRadiosRowComponent} from './ui/input/bootstrap/ngx-bootstrap-radios-row/ngx-bootstrap-radios-row.component';
import {NgxBootstrapCheckBoxRowComponent} from './ui/input/bootstrap/ngx-bootstrap-check-box-row/ngx-bootstrap-check-box-row.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {LoggingInterceptor} from "./interceptors/logging.interceptor";
import {IntArrayDateAdapterService} from "./services/datepicker/int-array-date-adapter.service";
import {ConfigurableDateParserFormatterService} from "./services/datepicker/configurable-date-parser-formatter.service";
import { NgxBootstrapDateRowComponent } from './ui/input/bootstrap/ngx-bootstrap-date-row/ngx-bootstrap-date-row.component';

@NgModule({
  declarations: [
    NgxBootstrapTextInputRowComponent,
    NgxBootstrapTextAreaRowComponent,
    NgxBootstrapSelectRowComponent,
    NgxBootstrapRadiosRowComponent,
    NgxBootstrapCheckBoxRowComponent,
    NgxBootstrapDateRowComponent],
  exports: [
    NgxBootstrapTextInputRowComponent,
    NgxBootstrapTextAreaRowComponent,
    NgxBootstrapSelectRowComponent,
    NgxBootstrapRadiosRowComponent,
    NgxBootstrapCheckBoxRowComponent,
    NgxBootstrapDateRowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    {provide: NgbDateAdapter, useClass: IntArrayDateAdapterService},
    {provide: NgbDateParserFormatter, useClass: ConfigurableDateParserFormatterService}
    ]
})
export class CoreModule {
}
