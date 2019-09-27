import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToIso'
})
export class TimestampToIsoPipe implements PipeTransform {

  transform(value): string {
    if (value && typeof value.toDate !== 'undefined') {
      let newValue = value.toDate().toISOString();
      return newValue;
      
    }
    return value;
  }
}
