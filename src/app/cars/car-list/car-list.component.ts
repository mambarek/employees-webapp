import { Component, OnInit } from '@angular/core';
import {CarSearchService, Group} from "@angular-it2go/car-fleet-api";
import {Car, Group as IGroup, Rule as IRule} from "@angular-it2go/car-fleet-api";
import {SearchTemplate as ISearchTemplate, CarTableItem as ICarTableItem} from "@angular-it2go/car-fleet-api";
import GroupOpEnum = Group.GroupOpEnum;

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html'
})
export class CarListComponent implements OnInit {

  itemsCount = 0;
  searchText = '';
  carTableItems: ICarTableItem[] = [];

  constructor(private carSearchService: CarSearchService) { }

  ngOnInit(): void {
    this.searchCars();
    console.log("--> ngOnInit call. carTableItems length:", this.carTableItems.length);
    console.log("--> ngOnInit call. carTableItems:", this.carTableItems);
  }

  searchCars(): void {
    let group: IGroup = {rules: []};
    if(this.searchText) {
      const brandRule: IRule = {
        field: 'brand',
        data: this.searchText,
        op: IRule.OpEnum.CONTAINS,
        type: IRule.TypeEnum.STRING
      };
      const modelRule: IRule = {
        field: 'model',
        data: this.searchText,
        op: IRule.OpEnum.CONTAINS,
        type: IRule.TypeEnum.STRING
      };
      // color is translated so this search will work only if you give the color id may use a dropdownlist for colors
      const colorRule: IRule = {
        field: 'color',
        data: this.searchText,
        op: IRule.OpEnum.CONTAINS,
        type: IRule.TypeEnum.STRING
      };
      const group: IGroup = {rules: [brandRule, modelRule, colorRule]};
      group.groupOp = GroupOpEnum.OR;
    }
    //const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'model', orderDirection: 'ASC'};
    const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'model'};

    this.carSearchService.search(searchTemplate).subscribe(response => {
      this.setGridItems(response.rows);
      this.itemsCount = response.records;
    }, error => console.error(error))
  }

  setGridItems(items: ICarTableItem[]){
    // as example take de
    const locale = 'DE'
    const resultList: ICarTableItem[] = [];
    items.forEach(item => {
      const newItem = {...item}; // shallow copy
      newItem.status = this.TRANSLATIONS[locale].CAR_STATUS[item.status];
      newItem.color = this.TRANSLATIONS[locale].COLOR[item.color];
      resultList.push(newItem);
    })

    this.carTableItems = resultList;

    console.log("--> setGridItems call. carTableItems length:", this.carTableItems.length);
    console.log("--> setGridItems call. carTableItems:", this.carTableItems);
  }

  // Translation should be offered from the called microservice
  // via Restful interface
  TRANSLATIONS = {'DE': {
      'CAR_STATUS': {
        'READY': 'Bereit',
        'UNDER_REPAIR': 'In Reparatur',
        'BROKEN': 'Kaputt'
        },
      'COLOR': {
        'White': 'Weiß',
        'Black': 'Schwarz',
        'Silver': 'Silber',
        'Red': 'Rot'
    }
                      }
                }
}
