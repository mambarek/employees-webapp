import { Injectable } from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ConfigurableDateParserFormatterService} from "./configurable-date-parser-formatter.service";

@Injectable({
  providedIn: 'root'
})
export class IsoDateAdapterService extends NgbDateAdapter<string>{

  constructor(private formatterService: ConfigurableDateParserFormatterService) {
    super();
  }

  fromModel(value: string | null): NgbDateStruct | null {
    return this.formatterService.parse(value);
  }

  toModel(date: NgbDateStruct | null): string | null {
    return this.formatterService.format(date);
  }
}
