import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToIso'
})
export class TimestampToIsoPipe implements PipeTransform {

  transform(value: firebase.firestore.Timestamp | string): string {
    if (typeof value === 'object') {
      let newValue = value.toDate().toISOString();
      return newValue;
    }
    if (typeof value === 'string') {
      return value;
    }
  }
}
