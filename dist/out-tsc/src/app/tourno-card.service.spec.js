import { TestBed } from '@angular/core/testing';
import { TournoCardService } from './shared/components/tournos-list/tourno-card/tourno-card.service';
describe('TournoCardService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(TournoCardService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=tourno-card.service.spec.js.map