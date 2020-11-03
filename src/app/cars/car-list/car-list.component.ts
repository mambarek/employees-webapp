import { Component, OnInit } from '@angular/core';
import {CarSearchService, Group} from "@angular-it2go/car-fleet-api";
import {Car, Group as IGroup, Rule as IRule} from "@angular-it2go/car-fleet-api";
import {SearchTemplate as ISearchTemplate, CarTableItem as ICarTableItem} from "@angular-it2go/car-fleet-api";
import GroupOpEnum = Group.GroupOpEnum;

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  itemsCount = 0;
  searchText = '';
  cars: Car[] = [];
  carTableItems: ICarTableItem[] = [];

  constructor(private carSearchService: CarSearchService) { }

  ngOnInit(): void {
    this.searchCars();
  }

  searchCars(): void {
    const brandRule: IRule = {field: 'brand', data: this.searchText, op: IRule.OpEnum.CONTAINS, type: IRule.TypeEnum.STRING};
    const modelRule: IRule = {field: 'model', data: this.searchText, op: IRule.OpEnum.CONTAINS, type: IRule.TypeEnum.STRING};
    const colorRule: IRule = {field: 'color', data: this.searchText, op: IRule.OpEnum.CONTAINS, type: IRule.TypeEnum.STRING};
    const group: IGroup = {rules: [brandRule, modelRule, colorRule]};
    group.groupOp = GroupOpEnum.OR;
    //const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'model', orderDirection: 'ASC'};
    const searchTemplate: ISearchTemplate = {filters: group, orderBy: 'model'};

    this.carSearchService.search(searchTemplate).subscribe(response => {
      this.carTableItems = response.rows;
      this.itemsCount = response.records;
    }, error => console.error(error))
  }
}
