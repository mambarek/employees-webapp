import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OverlayService} from "../overlay.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  @ViewChild('backdrop') backdrop: ElementRef;
  visible = false;
  defaultMessage = 'Loading ...';
  message = 'Loading ...';
  subscriptions: Subscription[] = [];
  hideSubscription: Subscription;
  startTime;
  minShowTime = 2000;
  canClosed = false;
  private canClose$: Subject<boolean> = new Subject<boolean>();
  closeIntervalId;

  constructor(private overlayService: OverlayService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.overlayService.showLoader$.subscribe(next => {
        this.show(next);
    }));

    this.subscriptions.push(
      this.overlayService.hideLoader$.subscribe(next => {
        this.hide();
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.hideSubscription.unsubscribe();
  }

  private show(config?: {message?: string, minTime?: number}) {
    // first reset overlay
    this.canClosed = false;
    if(this.hideSubscription) {
      this.hideSubscription.unsubscribe();
    }

    if(config && config.message)
      this.message = config.message;
    else
      this.message = this.defaultMessage;

    this.visible = true;
    this.closeIntervalId = setTimeout(() => {
      this.canClosed = true;
      this.canClose$.next(true);
    }, config && config.minTime? config.minTime*1000 : this.minShowTime)
  }

  private hide(){
    console.log("++ hide() call!!! canClosed: " + this.canClosed);
    if(this.canClosed){
      this.visible = false;
    }

    this.hideSubscription = this.canClose$.subscribe(close => {
      clearInterval(this.closeIntervalId);
      this.visible = false
      this.overlayService.loaderClosed$.next(true);
    });
  }

}
