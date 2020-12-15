import {Component, OnDestroy, OnInit} from '@angular/core';
import {OverlayService} from "../overlay.service";
import {Observable, of, Subject, Subscription} from "rxjs";

/**
 * Confirmation Dialog for user decision yes/no
 */
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  visible = false;
  title = 'Modal title';
  message = '';
  btnClass = "btn-primary";
  subscriptions: Subscription[] = [];
  saveDecision$: Subject<any> = new Subject<any>();

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

  onClose() {
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

  onSave(){
    this.saveDecision$.next(true);
    this.hide();
  }
}