import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let TimestampToIsoPipe = class TimestampToIsoPipe {
    transform(value) {
        if (value && typeof value.toDate !== 'undefined') {
            let newValue = value.toDate().toISOString();
            return newValue;
        }
        return value;
    }
};
TimestampToIsoPipe = tslib_1.__decorate([
    Pipe({
        name: 'timestampToIso'
    })
], TimestampToIsoPipe);
export { TimestampToIsoPipe };
//# sourceMappingURL=date-to-iso.pipe.js.map