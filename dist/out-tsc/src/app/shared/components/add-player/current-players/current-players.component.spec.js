import { async, TestBed } from '@angular/core/testing';
import { CurrentPlayersComponent } from './current-players.component';
describe('CurrentPlayersComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CurrentPlayersComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentPlayersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=current-players.component.spec.js.map