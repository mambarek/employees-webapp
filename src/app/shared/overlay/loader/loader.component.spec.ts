import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import {OverlayService} from "../overlay.service";
import {By} from "@angular/platform-browser";

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponent ],
      providers: [OverlayService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader', async(() => {
    const overlayService = TestBed.inject(OverlayService);
    const loaderMessage = 'My test loader ...';
    overlayService.showLoader({message: loaderMessage});
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.log(component);
      console.log(fixture.debugElement.nativeElement);
      const modal = fixture.debugElement.query(By.css('#loaderModal'));
      expect(modal).toBeTruthy();
      const messageEl = fixture.debugElement.query(By.css('.modal-body:first-child'));
      expect(messageEl).toBeTruthy();
      expect(messageEl.nativeElement.innerText).toEqual(loaderMessage);
    })
  }));

  it('should hide loader', async(() => {
    const overlayService = TestBed.inject(OverlayService);
    const loaderMessage = 'My test loader ...';
    overlayService.showLoader({message: loaderMessage});
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.log(component);
      console.log(fixture.debugElement.nativeElement);
      let modal = fixture.debugElement.query(By.css('#loaderModal'));
      expect(modal).toBeTruthy();
      const messageEl = fixture.debugElement.query(By.css('.modal-body:first-child'));
      expect(messageEl).toBeTruthy();
      expect(messageEl.nativeElement.innerText).toEqual(loaderMessage);

      overlayService.hideLoader().then(closed => {
          fixture.detectChanges();
          modal = fixture.debugElement.query(By.css('#loaderModal'));
          expect(modal).toBeFalsy();
        }
      );
    })
  }));

  it('should hide loader and reopen it with new message', async(() => {
    const overlayService = TestBed.inject(OverlayService);
    const loaderMessage = 'My test loader ...';
    overlayService.showLoader({message: loaderMessage});
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.log(component);
      console.log(fixture.debugElement.nativeElement);
      let modal = fixture.debugElement.query(By.css('#loaderModal'));
      expect(modal).toBeTruthy();
      const messageEl = fixture.debugElement.query(By.css('.modal-body:first-child'));
      expect(messageEl).toBeTruthy();
      expect(messageEl.nativeElement.innerText).toEqual(loaderMessage);

      overlayService.hideLoader().then(closed => {
          fixture.detectChanges();
          modal = fixture.debugElement.query(By.css('#loaderModal'));
          expect(modal).toBeFalsy();

          const newMessage = 'This new Loader ...';
          overlayService.showLoader({message: newMessage});

          fixture.detectChanges();

          modal = fixture.debugElement.query(By.css('#loaderModal'));
          expect(modal).toBeTruthy("Loader is not displayed");
          const messageEl = fixture.debugElement.query(By.css('.modal-body:first-child'));
          expect(messageEl).toBeTruthy("Message not found");
          expect(messageEl.nativeElement.innerText).toEqual(newMessage, "Message not equal");
        }
      );
    })
  }));

  it('should hide loader after 3 second', async(() => {
    const overlayService = TestBed.inject(OverlayService);
    const loaderMessage = 'My test loader ...';
    overlayService.showLoader({message: loaderMessage, minTime: 3});
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let startTime = Date.now();
      console.log(component);
      console.log(fixture.debugElement.nativeElement);
      let modal = fixture.debugElement.query(By.css('#loaderModal'));
      expect(modal).toBeTruthy();
      const messageEl = fixture.debugElement.query(By.css('.modal-body:first-child'));
      expect(messageEl).toBeTruthy();
      expect(messageEl.nativeElement.innerText).toEqual(loaderMessage);

      overlayService.hideLoader().then(closed => {
          let endTime = Date.now();
          let time = endTime - startTime;
          let seconds = Math.round(time/1000);
          console.log("seconds: " + seconds);
          expect(seconds).toEqual(3);

          fixture.detectChanges();
          modal = fixture.debugElement.query(By.css('#loaderModal'));
          expect(modal).toBeFalsy();

        }
      );
    })
  }));
});
