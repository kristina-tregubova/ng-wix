import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { CreateNewPlayerPopupComponent } from '../../popups/create-new-player-popup/create-new-player-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  createdPlayers: IPlayer[] = [];
  @Output() newChosenPlayer: EventEmitter<IPlayer> = new EventEmitter<IPlayer>();
  @Input() tournoInfo: IPlayer;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  handleOpenCreateNewPopup() {

    let dialogRef = this.dialog.open(CreateNewPlayerPopupComponent, {
      width: '450px',
      data: {
        'game': this.tournoInfo.game,
        'playerType': this.tournoInfo.playerType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createdPlayers.push(result);
      }
    });

  }

  handleAddChosenPlayers(player) {
    this.newChosenPlayer.emit(player);
  }

}
