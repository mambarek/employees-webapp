import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CarListComponent} from "./car-list.component";
import {AppModule} from "../../app.module";
import {ApiModule as CarApiModule,  CarSearchService} from '@angular-it2go/car-fleet-api';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {CARS} from "../../../../test/carfleet/cars";
import {of} from "rxjs";


fdescribe("CarListComponent", () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let el: DebugElement;
  let carSearchService: any;

  beforeEach(async(() => {

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
    carSearchService.search.and.returnValue(of({rows: CARS, records: 4}));

    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;

    // very important to update the list with assigned items
    fixture.detectChanges();

    el = fixture.debugElement;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display the car list",
    async(() => {
      fixture.whenStable().then(() => {
        const carsTable = el.query(By.css('.table-striped'));
        expect(carsTable).toBeTruthy("Could not find Cars");

        const tbody = el.query(By.css('tbody'));
        expect(tbody).toBeTruthy("tbody not found");

        const items = tbody.queryAll(By.css('tr'));
        expect(items.length).toEqual(4, "Should have 4 items");
      })
    })
  );

  it("should display the first car",
    async (() => {
      fixture.whenStable().then(() => {
        const tbody = el.query(By.css('tbody'));

        const firstRow = tbody.query(By.css('tr:first-child'));
        const allTds = firstRow.queryAll(By.css('td'));
        const td1 = allTds[1];

        //const td1 = el.query(By.css('tbody > :nth-child(1) > :nth-child(2)'))
        expect(td1.nativeElement.textContent).toEqual(CARS[0].brand)

        const link = el.query(By.css('#car-details-0'));
        expect(link.nativeElement.href).toContain(CARS[0].publicId)
      })
    })
  )

  it('Input search text "BMW" should display exactly one car in the list',
    async(() =>{
      fixture.whenStable().then(() => {
        // search text
        const searchInput = el.query(By.css('#search-text')).nativeElement;
        searchInput.value = "BMW";
        searchInput.dispatchEvent(new Event('input'))
        fixture.detectChanges();

        // mock the search, return only BMW car
        carSearchService.search.and.returnValue(of({rows: [CARS[0]], records: 1}));

        // click search
        const searchButton = el.query(By.css('#search-button')).nativeElement;
        searchButton.click();
        fixture.detectChanges();
      })

    })
  )

  //************************************ END ***************************************************
});
