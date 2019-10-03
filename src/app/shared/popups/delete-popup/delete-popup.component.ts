import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TournoService } from '../../tourno.service';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-success-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeletePopupComponent>,
    private router: Router,
    private tournoService: TournoService,
    private playerService: PlayerService
  ) { }

  handleDeletion() {
    switch (this.data.collectionName) {
      case 'tournaments':
        this.tournoService.deleteTourno(this.data.itemId);
        this.dialogRef.close();
        this.router.navigate(['/tournos-search']);
        break;

      case 'players':
        this.playerService.deletePlayer(this.data.itemId);
        this.dialogRef.close();
        this.router.navigate(['/players-search']);
        break;
    }
  }

  handleClosingPopup() {
    this.dialogRef.close();
  }

}
