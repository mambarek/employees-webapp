import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OverlayService} from "../overlay.service";
import {Observable, of, Subject, Subscription} from "rxjs";
import {trapFocus} from "../../../core/ui/util";

/**
 * Confirmation Dialog for user decision yes/no
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
  saveDecision$: Subject<any> = new Subject<any>();
  hasFocus = false;
  lastFocusedElement;

  constructor(private overlayService: OverlayService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.overlayService.showConfirmation$.subscribe(next => {

        // the service returns this decision observable to caller view
        // this the user decision to save changes
        this.overlayService.confirmationDecision$ = this.saveDecision$;

        this.show(next);
    }));
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
    console.log("## Show confirm dialog", config);
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
    this.saveDecision$.next(true);
    this.hide();
  }
}
