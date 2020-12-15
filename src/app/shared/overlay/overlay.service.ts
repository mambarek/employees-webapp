import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

/**
 * The OverlayService is an event emitter to Modal dialogs.
 * Modal dialogs like loader and confirmation subscribe to this events
 * to configure and display them.
 *
 * To chain a flow of actions. some methods returns an Observable to now exactly when
 * a dialog is closed. May be you wait for a user action to close a dialog or the backend server
 * is very slow so tha you wait for his response.
 */
@Injectable({providedIn: 'root'})
export class OverlayService {

  // loader observables
  // observables consumed by loader dialog
  showLoader$: Subject<any> = new Subject<any>();
  hideLoader$: Subject<any> = new Subject<any>();
  // when the user close the dialog this vent is fired
  loaderClosed$: Subject<any> = new Subject<any>();

  // confirmation dialog observables
  showConfirmation$: Subject<any> = new Subject<any>();
  // when the user close the dialog this vent is fired
  confirmationDecision$: Subject<boolean> = new Subject<boolean>();

  // error message observables
  showErrorMessage$: Subject<any> = new Subject<any>();
  errorMessageClosed$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  showLoader(loaderConfig?: {message: string, minTime?: number}){
    this.showLoader$.next(loaderConfig);
  }

  /**
   * Observable to wait for server response
   */
  hideLoader(): Observable<boolean>{
    this.hideLoader$.next();
    return this.loaderClosed$;
  }

  /**
   * Confirmation returns an observable it would be fired when the user click a close button
   * @param dialogConfig
   */
  showConfirmation(dialogConfig: {title?: string, message?: string, btnClass?: string}): Observable<boolean> {
    this.showConfirmation$.next(dialogConfig);
    return this.confirmationDecision$;
  }

  /**
   * Error message dialog is displayed until the user clicks a close button the observable event is then fired.
   * @param dialogConfig
   */
  showErrorMessage(dialogConfig: {title?: string, message?: string, btnClass?: string}): Observable<boolean>{
    this.showErrorMessage$.next(dialogConfig);
    return this.errorMessageClosed$;
  }
}
