import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationComponent } from './confirmation.component';
import {OverlayService} from "../overlay.service";
import {By} from "@angular/platform-browser";

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;
  let overlayService: OverlayService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    overlayService = TestBed.inject(OverlayService);
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show confirmation dialog, cancel button has focus', async(() => {
    overlayService.showConfirmation({title: 'Confirmation', message: 'Confirmation Message',
      btnText: 'Ok', btnClass: 'btn-warning'});
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const confirmModal = fixture.debugElement.query(By.css('#confirmModal'));
      expect(confirmModal).toBeTruthy("Confirmation modal should be shown");

      const title = fixture.debugElement.query(By.css('#confirmModalLabel'));
      expect(title.nativeElement.innerText).toEqual('Confirmation', 'Confirmation modal title should be displayed');

      const message = fixture.debugElement.query(By.css('.modal-body'));
      expect(message.nativeElement.innerText).toEqual('Confirmation Message','Message should be displayed');

      const confirmButton = fixture.debugElement.query(By.css('.modal-footer > :nth-child(2)'));
      expect(confirmButton).toBeTruthy("confirmButton not found");
      expect(confirmButton.nativeElement.innerText).toEqual('Ok', 'confirmButton text should equal "Ok"');
      expect(confirmButton.nativeElement.classList).toContain('btn-warning', "btn-warning class should be there");

      const focusElement = fixture.debugElement.query(By.css(".btn-secondary:focus"));
      expect(focusElement).toBeTruthy("Cancel button is not focused");
      expect(focusElement.nativeElement.innerText).toEqual('Cancel', 'Cancel button text wrong');
    })
  }))

  it('Click confirm button (Ok) should close Dialog', async(() => {
    overlayService.showConfirmation({title: 'Confirmation', message: 'Confirmation Message',
      btnText: 'Ok', btnClass: 'btn-warning'});
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const footer = fixture.debugElement.query(By.css('.modal-footer'));
      expect(footer).toBeTruthy("Footer is not displayed");

      setTimeout(() => {
        const confirmButton = fixture.debugElement.query(By.css('.modal-footer > :nth-child(2)'));
        expect(confirmButton).toBeTruthy("wrong button selector");
        confirmButton.nativeElement.click();
        fixture.detectChanges();
        const confirmModal = fixture.debugElement.query(By.css('#confirmModal'));
        expect(confirmModal).not.toBeTruthy("Dialog should disappear");
      }, 2000)
    })
  }));

  it('Click cancel button should close Dialog', async(() => {
    overlayService.showConfirmation({title: 'Confirmation', message: 'Confirmation Message',
      btnText: 'Ok', btnClass: 'btn-warning'});
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const footer = fixture.debugElement.query(By.css('.modal-footer'));
      expect(footer).toBeTruthy("Footer is not displayed");

      setTimeout(() => {
        const cancelButton = fixture.debugElement.query(By.css('.modal-footer > :nth-child(1)'));
        expect(cancelButton).toBeTruthy("wrong button selector");
        cancelButton.nativeElement.click();
        fixture.detectChanges();
        const confirmModal = fixture.debugElement.query(By.css('#confirmModal'));
        expect(confirmModal).not.toBeTruthy("Dialog should disappear");
      }, 2000)
    })
  }));

  it('Click X button should close Dialog', async(() => {
    overlayService.showConfirmation({title: 'Confirmation', message: 'Confirmation Message',
      btnText: 'Ok', btnClass: 'btn-warning'});
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const footer = fixture.debugElement.query(By.css('.modal-footer'));
      expect(footer).toBeTruthy("Footer is not displayed");

      setTimeout(() => {
        const x_button = fixture.debugElement.query(By.css('.modal-header > button'));
        expect(x_button).toBeTruthy("wrong button selector");
        x_button.nativeElement.click();
        fixture.detectChanges();
        const confirmModal = fixture.debugElement.query(By.css('#confirmModal'));
        expect(confirmModal).not.toBeTruthy("Dialog should disappear");
      }, 2000)
    })
  }));

  it('Close Dialog and open new one', async(() => {
    overlayService.showConfirmation({title: 'Confirmation', message: 'Confirmation Message',
      btnText: 'Ok', btnClass: 'btn-warning'});
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const footer = fixture.debugElement.query(By.css('.modal-footer'));
      expect(footer).toBeTruthy("Footer is not displayed");

      setTimeout(() => {
        const confirmButton = fixture.debugElement.query(By.css('.modal-footer > :nth-child(2)'));
        expect(confirmButton).toBeTruthy("wrong button selector");
        confirmButton.nativeElement.click();
        fixture.detectChanges();
        const confirmModal = fixture.debugElement.query(By.css('#confirmModal'));
        expect(confirmModal).not.toBeTruthy("Dialog should disappear");

        // open new one
        overlayService.showConfirmation({title: 'Save data', message: 'Save the changes',
          btnText: 'Save', btnClass: 'btn-success'});

        fixture.detectChanges();

        const newConfirmModal = fixture.debugElement.query(By.css('#confirmModal'));
        expect(newConfirmModal).toBeTruthy("Confirmation modal should be shown");

        const title = fixture.debugElement.query(By.css('#confirmModalLabel'));
        expect(title.nativeElement.innerText).toEqual('Save data', 'Wrong title');

      }, 2000)
    })
  }));

  /********************************** END Tests **********************************************/
});
