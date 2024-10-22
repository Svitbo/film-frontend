import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'revenueConverter'})
export class RevenueConverterPipe implements PipeTransform {
    transform(revenue : number) : string {
        if (revenue >= 1000000000) {
          return '$' + (revenue / 1000000000).toFixed(1) + ' В';
        } else if (revenue >= 1000000) {
          return '$' + (revenue / 1000000).toFixed(1) + ' М';
        } else if (revenue >= 1000) {
          return '$' + (revenue / 1000).toFixed(1) + ' К';
        } else if (revenue == 0) {
            return 'No Information about revenue'
        } else {
          return '$' + revenue;
        }
      }
}