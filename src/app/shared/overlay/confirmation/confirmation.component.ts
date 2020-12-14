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
  message = '';
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

  private show(message) {
    this.message = message;
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
