import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from './error/error.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { TournoCreationComponent } from './tourno-creation/tourno-creation.component';
import { TournoSearchComponent } from './tournos-search/tournos-search.component';
import { PlayersSearchComponent } from './players-search/players-search.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { TournoProfileComponent } from './tourno-profile/tourno-profile.component';


const routes: Routes = [
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
    component: ProfileSettingsComponent
  },
  {
    path: 'creation',
    component: TournoCreationComponent
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
    path: 'player-profile',
    component: PlayerProfileComponent
  },
  {
    path: 'tourno-profile',
    component: TournoProfileComponent
  },


  //______________
  {
    path: "**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
