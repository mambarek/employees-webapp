import { Injectable } from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ConfigurableDateParserFormatterService extends NgbDateParserFormatter {

  // we can here configure the delimiter in the env
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value && value.length === 10) {
      let date = value.split(this.DELIMITER);
      const year = parseInt(date[0], 10);
      const month = parseInt(date[1], 10);
      const day = parseInt(date[2], 10);

      const yearChecked = year && !isNaN(year) && date[0].length === 4;
      const monthChecked = month && !isNaN(month) && date[1].length === 2;
      const dayChecked = day && !isNaN(day) && date[2].length === 2;

      if(yearChecked && monthChecked && dayChecked) {
        return {
          year: year,
          month: month,
          day: day
        };
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    if(date){
      const day = date.day < 10 ? "0".concat(date.day.toString()) : date.day;
      const month = date.month < 10 ? "0".concat(date.month.toString()) : date.month;
      return date ? date.year + this.DELIMITER + month + this.DELIMITER + day : '';
    }

    return '';
  }
}
