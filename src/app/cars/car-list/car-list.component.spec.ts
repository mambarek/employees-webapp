import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import {CarListComponent} from "./car-list.component";
import {AppModule} from "../../app.module";
import {ApiModule as CarApiModule,  CarSearchService} from '@angular-it2go/car-fleet-api';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {CarTableItems} from "../../../../test/carfleet/CarTableItems";
import {of} from "rxjs";


describe("CarListComponent", () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let el: DebugElement;
  let carSearchService: any;

  beforeEach(waitForAsync(() => {
    // create search service spy and provide it
    const carSearchServiceSpy = jasmine.createSpyObj('CarSearchService', ['search']);

    TestBed.configureTestingModule({
      imports: [AppModule, CarApiModule ],
      providers: [
        {provide: CarSearchService, useValue: carSearchServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // mock the search service method search
    carSearchService = TestBed.inject(CarSearchService);
    carSearchService.search.and.returnValue(of({rows: CarTableItems, records: 4}));

    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;

    // very important to update the list with assigned items
    fixture.detectChanges();

    el = fixture.debugElement;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display the car list",() => {
      const carsTable = el.query(By.css('.table-striped'));
      expect(carsTable).toBeTruthy("Could not find Cars");

      const tbody = el.query(By.css('tbody'));
      expect(tbody).toBeTruthy("tbody not found");

      const items = tbody.queryAll(By.css('tr'));
      expect(items.length).toEqual(4, "Should have 4 items");
    }
  );

  it("should display the first car", () => {
      const tbody = el.query(By.css('tbody'));
      const firstRow = tbody.query(By.css('tr:first-child'));
      const allTds = firstRow.queryAll(By.css('td'));
      const brandTd = allTds[1];
      const firstCar = CarTableItems[0];

      //const td1 = el.query(By.css('tbody > :nth-child(1) > :nth-child(2)'))
      expect(brandTd.nativeElement.textContent).toEqual(firstCar.brand)

      const link = el.query(By.css('#car-details-0'));
      expect(link.nativeElement.href).toContain(firstCar.publicId)
    }
  )

  it('Input search text "BMW" should display exactly one car in the list',
    waitForAsync(() =>{
      // search text
      const searchInput = el.query(By.css('#search-text')).nativeElement;
      searchInput.value = "BMW";
      searchInput.dispatchEvent(new Event('input'))
      fixture.detectChanges();

      // mock the search, return only BMW car
      carSearchService.search.and.returnValue(of({rows: [CarTableItems[0]], records: 1}));

      fixture.whenStable().then(() => {
        // click search
        const searchButton = el.query(By.css('#search-button')).nativeElement;
        searchButton.click();
        fixture.detectChanges();

        const tbody = el.query(By.css('tbody'));
        const allTrs = tbody.queryAll(By.css('tr'));
        expect(allTrs.length).toEqual(1);
      })
    })
  );

  //************************************ END ***************************************************
});
