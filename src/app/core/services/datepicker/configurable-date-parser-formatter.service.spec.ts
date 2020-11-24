import { TestBed } from '@angular/core/testing';

import { ConfigurableDateParserFormatterService } from './configurable-date-parser-formatter.service';

describe('ConfigurableDateParserFormatterService', () => {
  let service: ConfigurableDateParserFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurableDateParserFormatterService);
  });

  describe('parsing', () => {

    it('should parse null undefined and empty string as null', () => {
      expect(service.parse(<any>null)).toBeNull();
      expect(service.parse(<any>undefined)).toBeNull();
      expect(service.parse('')).toBeNull();
      expect(service.parse('   ')).toBeNull();
    });

    it('should parse valid date', () => {
      expect(service.parse('2016-05-12')).toEqual({year: 2016, month: 5, day: 12});
    });

    it('should parse non-date as null', () => {
      expect(service.parse('foo-bar-baz')).toBeNull();
      expect(service.parse('2014-bar')).toBeNull();
      expect(service.parse('2014-11-12-15')).toBeNull();
      expect(service.parse('2011-5')).toBeNull();
    });

  });

  describe('formatting', () => {

    it('should format null and undefined as an empty string', () => {
      expect(service.format(null)).toBe('');
      expect(service.format(<any>undefined)).toBe('');
    });

    it('should format a valid date', () => {
      expect(service.format({year: 2016, month: 10, day: 15})).toBe('2016-10-15');
    });

    it('should format a valid date with padding',
      () => { expect(service.format({year: 2016, month: 10, day: 5})).toBe('2016-10-05'); });

  });
});
