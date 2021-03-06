import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';
import {OverlayService} from "../overlay.service";
import {By} from "@angular/platform-browser";

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;
  let overlayService: OverlayService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    overlayService = TestBed.inject(OverlayService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display error dialog', waitForAsync(() => {
    overlayService.showErrorMessage({title: 'Error', message: 'This is an error message'});
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const errorModal = fixture.debugElement.query(By.css('#errorModal'));
      expect(errorModal).toBeTruthy("ErrorDialog is not displayed");

      const header = fixture.debugElement.query(By.css('.modal-header'));
      expect(header).toBeTruthy("Header not found");

      const title = header.query(By.css('#errorModalLabel'));
      expect(title.nativeElement.innerText).toEqual('Error', "Header text not correct");

      const body = fixture.debugElement.query(By.css('.modal-body'));
      expect(body).toBeTruthy("Modal body not found");
      expect(body.nativeElement.innerText).toEqual("This is an error message","Wrong error message displayed");
    })
  }));

  it('Close button should displayed and has focus', waitForAsync(() => {
    overlayService.showErrorMessage({title: 'Error', message: 'This is an error message', btnClass: 'btn-success'});
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const errorModal = fixture.debugElement.query(By.css('#errorModal'));
      expect(errorModal).toBeTruthy("ErrorDialog is not displayed");

      const footer = fixture.debugElement.query(By.css('.modal-footer'));
      expect(footer).toBeTruthy("Footer is not displayed");

      //const closeButton = fixture.debugElement.query(By.css('.modal-footer:first-child'));
      const closeButton = footer.query(By.css('button'));
      expect(closeButton).toBeTruthy("Close button is not displayed");

      expect(closeButton.nativeElement.classList).toContain("btn-success");
      console.log('Check focus');
      const focusElement = footer.query(By.css(".btn-success:focus"));
      expect(focusElement).toBeTruthy("Close button is not focused");

      // Tab testing not working
      /*const event = new KeyboardEvent("keypress",{"key": "Tab"});
      closeButton.nativeElement.dispatchEvent(event);
      fixture.detectChanges();*/
    })
  }));

  it('Click Close button should close ErrorDialog', waitForAsync(() => {
    overlayService.showErrorMessage({title: 'Error', message: 'This is an error message', btnClass: 'btn-success'});
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const footer = fixture.debugElement.query(By.css('.modal-footer'));
      expect(footer).toBeTruthy("Footer is not displayed");

      setTimeout(() => {
        const closeButton = footer.query(By.css('button'));
        closeButton.nativeElement.click();
        fixture.detectChanges();
        const errorModal = fixture.debugElement.query(By.css('#errorModal'));
        expect(errorModal).not.toBeTruthy("Dialog should disappear");
      }, 2000)
    })
  }));

  it('Click X button should close ErrorDialog', waitForAsync(() => {
    overlayService.showErrorMessage({title: 'Error', message: 'This is an error message', btnClass: 'btn-success'});
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const footer = fixture.debugElement.query(By.css('.modal-footer'));
      expect(footer).toBeTruthy("Footer is not displayed");

      setTimeout(() => {
        const x_button = fixture.debugElement.query(By.css('.modal-header > button'));
        expect(x_button).toBeTruthy("wrong button selector");
        x_button.nativeElement.click();
        fixture.detectChanges();
        const errorModal = fixture.debugElement.query(By.css('#errorModal'));
        expect(errorModal).not.toBeTruthy("Dialog should disappear");
      }, 2000)
    })
  }));
  /********************************** END Tests **********************************************/
});

