import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class OverlayService {

  showLoader$: Subject<any> = new Subject<any>();
  hideLoader$: Subject<any> = new Subject<any>();
  loaderClosed$: Subject<any> = new Subject<any>();

  showConfirmation$: Subject<any> = new Subject<any>();
  confirmationDecision$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  showLoader(loaderConfig?: {message: string, minTime?: number}){
    this.showLoader$.next(loaderConfig);
  }

  hideLoader() : Observable<boolean>{
    this.hideLoader$.next();
    return this.loaderClosed$;
  }

  showConfirmation(message) : Observable<boolean> {
    this.showConfirmation$.next(message);
    return this.confirmationDecision$;
  }

}
