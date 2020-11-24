import { Injectable } from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class IntArrayDateAdapterService extends NgbDateAdapter<number[]>{

  constructor() {
    super();
  }

  fromModel(value: number[] | null): NgbDateStruct | null {
    if(!value) { // @ts-ignore
      return null;
    }
    // this.formatter.parse(value);
    if(value.length == 3) {
      const struct =  {
        year: value[0],
        month: value[1],
        day: value[2]
      }
      return struct;
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): number[] | null {
    if(date) {
      return [date.year, date.month, date.day];
    }
    return null;
  }
}
