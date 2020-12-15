import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {OverlayService} from "../overlay.service";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  visible = false;
  title = 'Error';
  message = 'An error occurred. Please contact our service.';
  btnClass = "btn-danger";
  subscriptions: Subscription[] = [];
  confirmDecision$: Subject<any> = new Subject<any>();

  constructor(private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.overlayService.showErrorMessage$.subscribe(next => {

        // the service returns this decision observable to caller view
        // this the user decision to save changes
        this.overlayService.confirmationDecision$ = this.confirmDecision$;

        this.show(next);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onClose() {
    this.confirmDecision$.next(true);
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
    this.visible = false;
  }
}
