import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TournoProfileModule } from './tourno-profile/tourno-profile.module';

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
import { SuccessPopupComponent } from './shared/popups/success-popup/success-popup.component';
import { DeletePopupComponent } from './shared/popups/delete-popup/delete-popup.component';
import { FileUploadPopupComponent } from './shared/popups/file-upload-popup/file-upload-popup.component';
import { CreateNewPlayerPopupComponent } from './shared/popups/create-new-player-popup/create-new-player-popup.component';


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
    FileUploadPopupComponent,
    SuccessPopupComponent,
    DeletePopupComponent,
    CreateNewPlayerPopupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    CoreModule,
    SharedModule,
    TournoProfileModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SuccessPopupComponent,
    DeletePopupComponent,
    FileUploadPopupComponent,
    CreateNewPlayerPopupComponent
  ]
  
})
export class AppModule { }
