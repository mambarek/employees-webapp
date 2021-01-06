import { Component, OnInit } from '@angular/core';
import {CarSearchService, Group} from "@angular-it2go/car-fleet-api";
import {Car, Group as IGroup, Rule as IRule} from "@angular-it2go/car-fleet-api";
import {SearchTemplate as ISearchTemplate, CarTableItem as ICarTableItem} from "@angular-it2go/car-fleet-api";
import GroupOpEnum = Group.GroupOpEnum;
import {ActivatedRoute, Router} from "@angular/router";
import {CarFleetAppService} from "../../services/car-fleet-app.service";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html'
})
export class CarListComponent implements OnInit {

  itemsCount = 0;
  searchText = '';
  carTableItems: ICarTableItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private carFleetAppService: CarFleetAppService) { }

  ngOnInit(): void {
    this.searchCars();
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
      group.rules = [brandRule, modelRule, colorRule];
      group.groupOp = GroupOpEnum.OR;
    }
    //const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'model', orderDirection: 'ASC'};
    const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'model'};
    this.carFleetAppService.search(searchTemplate).subscribe(response => {
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
        'Blue': 'Blau',
        'Red': 'Rot'
    }
                      }
                }

  addNewCar() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }
}
