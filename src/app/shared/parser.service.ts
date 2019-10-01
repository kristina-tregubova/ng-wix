import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  parseTo(val) {
   return JSON.stringify(val, this.replacer);
  }

  parseFrom(val) {
    return JSON.parse(val, this.reviver);
   }

  replacer(key, value) {
    const originalObject = this[key];
    if(originalObject instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(originalObject.entries()), // or with spread: value: [...originalObject]
      };
    } else {
      return value;
    }
  }

  reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }
}
