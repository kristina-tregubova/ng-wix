import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BracketComponent } from './bracket/bracket.component';
import { RoundComponent } from './bracket/round/round.component';
import { GameComponent } from './bracket/round/game/game.component';
import { TournoProfileComponent } from './tourno-profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TournoProfileComponent,
    BracketComponent,
    RoundComponent,
    GameComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TournoProfileModule { }
