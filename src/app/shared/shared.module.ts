import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LoaderComponent } from './overlay/loader/loader.component';
import { ConfirmationComponent } from './overlay/confirmation/confirmation.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, ConfirmationComponent],
  exports: [ConfirmationComponent, LoaderComponent]
})
export class SharedModule {
}
