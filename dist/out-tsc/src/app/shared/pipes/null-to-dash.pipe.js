import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let NullToDashPipe = class NullToDashPipe {
    transform(value, ...args) {
        return (value == null) ? '-' : value;
    }
};
NullToDashPipe = tslib_1.__decorate([
    Pipe({
        name: 'nullToDash'
    })
], NullToDashPipe);
export { NullToDashPipe };
//# sourceMappingURL=null-to-dash.pipe.js.map