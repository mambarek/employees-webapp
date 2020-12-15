import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LoaderComponent } from './overlay/loader/loader.component';
import { ConfirmationComponent } from './overlay/confirmation/confirmation.component';
import { ErrorMessageComponent } from './overlay/error-message/error-message.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, ConfirmationComponent, ErrorMessageComponent],
  exports: [ConfirmationComponent, LoaderComponent, ErrorMessageComponent]
})
export class SharedModule {
}
