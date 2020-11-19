import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgxBootstrapTextInputRowComponent} from './ui/input/bootstrap/ngx-bootstrap-text-input-row/ngx-bootstrap-text-input-row.component';
import {NgxBootstrapTextAreaRowComponentComponent} from './ui/input/bootstrap/ngx-bootstrap-text-area-row-component/ngx-bootstrap-text-area-row-component.component';
import {NgxBootstrapDateInputRowComponentComponent} from './ui/input/bootstrap/ngx-bootstrap-date-input-row-component/ngx-bootstrap-date-input-row-component.component';
import {NgxBootstrapSelectRowComponentComponent} from './ui/input/bootstrap/ngx-bootstrap-select-row-component/ngx-bootstrap-select-row-component.component';
import {NgxBootstrapRadiosRowComponentComponent} from './ui/input/bootstrap/ngx-bootstrap-radios-row-component/ngx-bootstrap-radios-row-component.component';
import {NgxBootstrapCheckBoxsRowComponentComponent} from './ui/input/bootstrap/ngx-bootstrap-check-boxs-row-component/ngx-bootstrap-check-boxs-row-component.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    NgxBootstrapTextInputRowComponent,
    NgxBootstrapTextAreaRowComponentComponent,
    NgxBootstrapDateInputRowComponentComponent,
    NgxBootstrapSelectRowComponentComponent,
    NgxBootstrapRadiosRowComponentComponent,
    NgxBootstrapCheckBoxsRowComponentComponent],
  exports: [
    NgxBootstrapTextInputRowComponent,
    NgxBootstrapTextAreaRowComponentComponent,
    NgxBootstrapDateInputRowComponentComponent,
    NgxBootstrapSelectRowComponentComponent,
    NgxBootstrapRadiosRowComponentComponent,
    NgxBootstrapCheckBoxsRowComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ]
})
export class CoreModule {
}
