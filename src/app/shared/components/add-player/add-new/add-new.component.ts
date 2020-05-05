import { Component, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { CreateNewPlayerPopupComponent } from '../../popups/create-new-player-popup/create-new-player-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnDestroy {

  createdPlayers: IPlayer[] = [];
  sub: Subscription;

  @Input() tournoInfo: IPlayer;
  @Output() newChosenPlayer: EventEmitter<IPlayer> = new EventEmitter<IPlayer>();

  constructor(
    public dialog: MatDialog
  ) { }

  public handleOpenCreateNewPopup(): void {

    let dialogRef = this.dialog.open(CreateNewPlayerPopupComponent, {
      width: '450px',
      data: {
        'game': this.tournoInfo.game,
        'playerType': this.tournoInfo.playerType
      }
    });

    this.sub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createdPlayers.push(result);
      }
    });

  }

  public handleAddChosenPlayers(player: IPlayer): void {
    this.newChosenPlayer.emit(player);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
