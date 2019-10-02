import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToDash'
})
export class NullToDashPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
      return (value == null) ? '-' : value;
    }

}
