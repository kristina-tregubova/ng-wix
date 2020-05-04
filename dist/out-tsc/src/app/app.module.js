import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TournoProfileModule } from './components/tourno-profile/tourno-profile.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { TournoCreationComponent } from './components/tourno-creation/tourno-creation.component';
import { TournoSearchComponent } from './components/tournos-search/tournos-search.component';
import { PlayersSearchComponent } from './components/players-search/players-search.component';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';
import { SuccessPopupComponent } from './shared/popups/success-popup/success-popup.component';
import { DeletePopupComponent } from './shared/popups/delete-popup/delete-popup.component';
import { FileUploadPopupComponent } from './shared/popups/file-upload-popup/file-upload-popup.component';
import { CreateNewPlayerPopupComponent } from './shared/popups/create-new-player-popup/create-new-player-popup.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
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
            AngularFirestoreModule,
            AngularFireAuthModule,
            CoreModule,
            SharedModule,
            TournoProfileModule,
            DragDropModule,
            environment.production ? [] : AkitaNgDevtools.forRoot(),
            AkitaNgRouterStoreModule.forRoot()
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map