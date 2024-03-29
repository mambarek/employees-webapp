import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OverlayService} from "../overlay.service";
import {Observable, of, Subject, Subscription} from "rxjs";
import {trapFocus} from "../../../core/ui/util";

/**
 * Confirmation Dialog for user decision yes/no
 * Der Dialog subscribed sich bei overlay service in ein dafür vorgesehene observer
 */
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy, AfterViewChecked{

  @ViewChild('confirmDialog') confirmDialog : ElementRef;
  @ViewChild('closeButton') closeButton : ElementRef;
  visible = false;
  title = 'Modal title';
  message = '';
  btnText = 'Confirm'
  btnClass = "btn-primary";
  subscriptions: Subscription[] = [];
  hasFocus = false;
  lastFocusedElement;

  constructor(private overlayService: OverlayService) {
  }

  subscribeToService(){
    this.subscriptions.push(
      this.overlayService.showConfirmation$.subscribe(next => { // next ist dialog data

        // the service returns this decision observable to caller view
        // this the user decision to save changes
        // IMPORTANT reset the observable for new decision
        this.overlayService.confirmationDecision$ = new Subject<boolean>();

        this.show(next);
      }));
  }

  ngOnInit() {
    this.subscribeToService();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngAfterViewChecked(): void {
    if(!this.hasFocus && this.confirmDialog) {
      this.lastFocusedElement = document.activeElement;
      this.hasFocus = true;
      this.closeButton.nativeElement.focus();
      trapFocus(this.confirmDialog.nativeElement);
    }
  }

  onClose() {
    this.hide();
  }

  private show(config: {title?: string, message?: string, btnText?: string, btnClass?: string}) {
    this.message = config.message ? config.message : '';
    this.title = config.title ? config.title : 'Modal title';
    this.btnText = config.btnText ? config.btnText : 'Confirm';
    this.btnClass = config.btnClass ? config.btnClass : 'btn-primary';

    this.visible = true;
  }

  private hide() {
    this.hasFocus = false;
    this.visible = false;
    if(this.lastFocusedElement) this.lastFocusedElement.focus();
  }

  onConfirm(){
    this.overlayService.confirmationDecision$.next(true);
    this.hide();
  }
}
