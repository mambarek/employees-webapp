import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {OverlayService} from "../overlay.service";
import {trapFocus} from "../../../core/ui/util";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('errorDialog') errorDialog : ElementRef;
  @ViewChild('closeButton') closeButton : ElementRef;
  visible = false;
  title = 'Error';
  message = 'An error occurred. Please contact our service.';
  btnClass = "btn-danger";
  subscriptions: Subscription[] = [];
  hasFocus = false;
  lastFocusedElement;

  constructor(private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.overlayService.showErrorMessage$.subscribe(next => {

        // the service returns this decision observable to caller view
        // this the user decision to save changes
        // IMPORTANT reset the observable for new decision
        this.overlayService.errorMessageClosed$ = new Subject<boolean>();

        this.show(next);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngAfterViewChecked(): void {
    if(!this.hasFocus && this.errorDialog) {
      this.lastFocusedElement = document.activeElement;
      this.hasFocus = true;
      this.closeButton.nativeElement.focus();
      trapFocus(this.errorDialog.nativeElement);
    }
  }

  onClose() {
    this.overlayService.errorMessageClosed$.next(true);
    this.hide();
  }

  private show(config: {title?: string, message?: string, btnClass?: string}) {
    if(config.message)
      this.message = config.message;

    if(config.title)
      this.title = config.title;

    if(config.btnClass)
      this.btnClass = config.btnClass;

    this.visible = true;
  }

  private hide() {
    this.hasFocus = false;
    this.visible = false;
    if(this.lastFocusedElement) this.lastFocusedElement.focus();
  }
}
