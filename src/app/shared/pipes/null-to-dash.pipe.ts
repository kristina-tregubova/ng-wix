import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToDash'
})
export class NullToDashPipe implements PipeTransform {

  transform(value: string | null): string {
    return (value == null) ? '-' : value;
  }

}
