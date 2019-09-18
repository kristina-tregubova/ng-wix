import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { AddPlayerComponent } from './add-player/add-player.component';
import { TournosListComponent } from './tournos-list/tournos-list.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { TournoCardComponent } from './tournos-list/tourno-card/tourno-card.component';
import { PlayerCardComponent } from './players-list/player-card/player-card.component';
import { AddNewComponent } from './add-player/add-new/add-new.component';
import { AddFromListComponent } from './add-player/add-from-list/add-from-list.component';
import { ErrorAreaComponent } from './error-area/error-area.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

import {
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatCardModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatDividerModule,
  MatTableModule,
  MatDialogModule,
  MatStepperModule,

} from '@angular/material';



@NgModule({
  declarations: [
    AddPlayerComponent,
    AddNewComponent,
    AddFromListComponent,
    PlayersListComponent,
    TournosListComponent,
    TournoCardComponent,
    PlayerCardComponent,
    ErrorAreaComponent,
    LoadingSpinnerComponent,

  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatStepperModule,

  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatStepperModule,

    AddPlayerComponent,
    AddNewComponent,
    AddFromListComponent,
    TournosListComponent,
    PlayersListComponent,
    TournoCardComponent,
    PlayerCardComponent,
    ErrorAreaComponent,
    LoadingSpinnerComponent,

  ]
})
export class SharedModule { }
