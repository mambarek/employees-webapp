import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CarListComponent} from "./car-list.component";
import {AppModule} from "../../app.module";
import {
  ApiModule as CarApiModule,
  BASE_PATH as carBasePath,
  CarSearchService
} from '@angular-it2go/car-fleet-api';
import {environment} from "../../../environments/environment";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {CARS} from "../../../../test/carfleet/cars";
import {of} from "rxjs";


describe("CarListComponent", () => {
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

    //component.setGridItems(CARS);
    // very important to update the list with assigned items
    fixture.detectChanges();

    el = fixture.debugElement;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
    //console.log("environment", environment);
    console.log("All Cars", component.carTableItems);
  });

  it("should display the car list", () => {
    const carsTable = el.query(By.css('.table-striped'));
    expect(carsTable).toBeTruthy("Could not find Cars");
    const tbody = el.query(By.css('tbody'));
    expect(tbody).toBeTruthy("tbody not found");
    console.log("tbody", tbody);
    const items = tbody.queryAll(By.css('tr'));
    expect(items.length).toEqual(4, "Should have 4 items");

    // how to query the td with car brand of first car
    console.log("First tr", items[0]);
    const allTds = items[0].queryAll(By.css('td'));
    console.log("Second td", allTds[1]);
    console.log("Second td text", allTds[1].nativeElement.textContent);;
  });

  it("should display the first car", () => {
    const tbody = el.query(By.css('tbody'));
    const firstRow = tbody.query(By.css('tr:first-child'));
    console.log("firstRow", firstRow);
    const td1 = el.query(By.css('tbody > :nth-child(1) > :nth-child(2)'))
    console.log("--->>> td1 text: " , td1.nativeElement.textContent);
    expect(td1.nativeElement.textContent).toEqual(CARS[0].brand)
    const link = el.query(By.css('#car-details-0'));
    console.log("--->>> Link href: " , link.nativeElement.href);
    expect(link.nativeElement.href).toContain(CARS[0].publicId)
  })
});
