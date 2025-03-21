import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OverlayService} from "../overlay.service";
import {Subject, Subscription, timer} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  @ViewChild('backdrop') backdrop: ElementRef;

  _visible = false;
  private defaultMessage = 'Loading ...';
  message = 'Loading ...';
  private subscriptions: Subscription[] = [];
  private minShowTime = 2000;
  private canClosed = false;
  private closeSubscription: Subscription;
  private canClose$: Subject<boolean> = new Subject<boolean>();

  constructor(private overlayService: OverlayService) {
  }

  set visible(visible: boolean) {
    console.log("++ visible set to: " + visible);
    this._visible = visible;
  }

  get visible(): boolean {
    return this._visible;
  }

  ngOnInit(): void {
    console.log("-- Loader::ngOnInit()");
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
    this.subscriptions.forEach(subscription => {if(subscription) subscription.unsubscribe()});
  }

  private show(config?: {message?: string, minTime?: number}) {
    if(this.closeSubscription) this.closeSubscription.unsubscribe();
    this.canClosed = false;

    if(config && config.message)
      this.message = config.message;
    else
      this.message = this.defaultMessage;

    this.visible = true;
    timer(config && config.minTime? config.minTime*1000 : this.minShowTime)
    .subscribe(() => {
      this.canClosed = true;
      this.canClose$.next(true);
    })
  }

  /**
   * hide is a little tricky
   * hide would be called from an async process.
   * the process can take time less or greater then loader minTime
   * In the first case the loader would wait for minTime the hide it self
   * In the second case the loader will wait for an Observable to finish loading
   * then hide it self.
   * @private
   */
  private hide(){
    // hide is called from async after time more the minTime. so we can hide the loader.
    // case tow the async process takes more time than loader minTime
    // canClosed it set in the miTime timer. so the minTime is exceeded
    if(this.canClosed){
      // hide loader
      this.visible = false;
      // notify observer that the loader is closed. they may redirect or do an other action
      this.overlayService.loaderClosed$.next(true);
      return;
    }

    // canClosed it yet not set (mitTime not reached)
    // now hide is come before minTime is exceeded. the async process is more quickly than mitTime
    // so subscribe to mitTime timer and wait for reaching minTime. after that we can hide the loader.
    // reset subscription
    if(this.closeSubscription) this.closeSubscription.unsubscribe();

    this.closeSubscription = this.canClose$.subscribe(() => {
      this.visible = false
      this.overlayService.loaderClosed$.next(true);
    });

    this.subscriptions.push(this.closeSubscription);
  }

}
