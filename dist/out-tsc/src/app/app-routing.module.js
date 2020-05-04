import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { TournoCreationComponent } from './components/tourno-creation/tourno-creation.component';
import { TournoSearchComponent } from './components/tournos-search/tournos-search.component';
import { PlayersSearchComponent } from './components/players-search/players-search.component';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';
import { TournoProfileComponent } from './components/tourno-profile/tourno-profile.component';
import { CanDeactivateGuard } from './core/deactivate-guard.service';
const routes = [
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: LandingComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'settings',
        component: ProfileSettingsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'creation',
        component: TournoCreationComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'tournos-search',
        component: TournoSearchComponent
    },
    {
        path: 'players-search',
        component: PlayersSearchComponent
    },
    {
        path: 'player-profile/:id',
        component: PlayerProfileComponent
    },
    {
        path: 'tourno-profile/:id',
        component: TournoProfileComponent
    },
    //______________
    {
        path: "**",
        component: ErrorComponent
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map