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
  visible = false;
  private defaultMessage = 'Loading ...';
  message = 'Loading ...';
  private subscriptions: Subscription[] = [];
  private minShowTime = 2000;
  private canClosed = false;

  private canClose$: Subject<boolean> = new Subject<boolean>();

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
    this.subscriptions.forEach(subscription => {if(subscription) subscription.unsubscribe()});
  }

  private show(config?: {message?: string, minTime?: number}) {
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

  private hide(){
    if(this.canClosed){
      this.visible = false;
    }

    this.subscriptions.push(this.canClose$.subscribe(() => {
      this.visible = false
      this.overlayService.loaderClosed$.next(true);
    }));
  }

}
