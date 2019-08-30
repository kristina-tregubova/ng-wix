import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from './error/error.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { TournoCreationComponent } from './tourno-creation/tourno-creation.component';
import { TournoSearchComponent } from './tournos-search/tournos-search.component';
import { PlayersSearchComponent } from './players-search/players-search.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { TournoProfileComponent } from './tourno-profile/tourno-profile.component';
import { TournoCardComponent } from './shared/tournos-list/tourno-card/tourno-card.component';
import { PlayerCardComponent } from './shared/players-list/player-card/player-card.component';
import { AddPlayerComponent } from './shared/add-player/add-player.component';
import { PlayersListComponent } from './shared/players-list/players-list.component';
import { TournosListComponent } from './shared/tournos-list/tournos-list.component';
import { AddNewComponent } from './shared/add-player/add-new/add-new.component';
import { AddFromListComponent } from './shared/add-player/add-from-list/add-from-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    ErrorComponent,
    AuthComponent,
    ProfileSettingsComponent,
    TournoCreationComponent,
    TournoSearchComponent,
    PlayersSearchComponent,
    PlayerProfileComponent,
    TournoProfileComponent,
    TournoCardComponent,
    PlayerCardComponent,
    AddPlayerComponent,
    PlayersListComponent,
    TournosListComponent,
    AddNewComponent,
    AddFromListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
