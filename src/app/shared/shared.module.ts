import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { AddPlayerComponent } from './components/add-player/add-player.component';
import { TournosListComponent } from './components/tournos-list/tournos-list.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { TournoCardComponent } from './components/tournos-list/tourno-card/tourno-card.component';
import { PlayerCardComponent } from './components/players-list/player-card/player-card.component';
import { AddNewComponent } from './components/add-player/add-new/add-new.component';
import { AddFromListComponent } from './components/add-player/add-from-list/add-from-list.component';
import { ErrorAreaComponent } from './components/error-area/error-area.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TimestampToIsoPipe } from './pipes/date-to-iso.pipe';
import { CurrentPlayersComponent } from './components/add-player/current-players/current-players.component';
import { NullToDashPipe } from './pipes/null-to-dash.pipe';
import { GlobalSpinnerComponent } from './global-spinner/global-spinner.component';

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
  MatSnackBarModule

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
    TimestampToIsoPipe,
    CurrentPlayersComponent,
    NullToDashPipe,
    GlobalSpinnerComponent,

  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
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
    MatSnackBarModule

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
    MatSnackBarModule,

    AddPlayerComponent,
    AddNewComponent,
    AddFromListComponent,
    TournosListComponent,
    PlayersListComponent,
    TournoCardComponent,
    PlayerCardComponent,
    ErrorAreaComponent,
    LoadingSpinnerComponent,
    TimestampToIsoPipe,
    NullToDashPipe,
    GlobalSpinnerComponent

  ]
})
export class SharedModule { }
