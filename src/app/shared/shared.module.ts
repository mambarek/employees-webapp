import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LoaderComponent } from './overlay/loader/loader.component';
import { ConfirmationComponent } from './overlay/confirmation/confirmation.component';
import { ErrorMessageComponent } from './overlay/error-message/error-message.component';
import { AddressComponent } from './ui/address/address.component';
import {CoreModule} from "../core/core.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, CoreModule, FormsModule],
  declarations: [LoaderComponent, ConfirmationComponent, ErrorMessageComponent, AddressComponent],
  exports: [ConfirmationComponent, LoaderComponent, ErrorMessageComponent, AddressComponent]
})
export class SharedModule {
}
