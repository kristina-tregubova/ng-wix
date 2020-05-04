import { async, TestBed } from '@angular/core/testing';
import { CreateNewPlayerPopupComponent } from './create-new-player-popup.component';
describe('CreateNewPlayerPopupComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateNewPlayerPopupComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CreateNewPlayerPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=create-new-player-popup.component.spec.js.map