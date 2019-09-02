import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { SharedModule } from './shared/shared.module';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
