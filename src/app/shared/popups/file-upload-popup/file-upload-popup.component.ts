import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-file-upload-popup',
  templateUrl: './file-upload-popup.component.html',
  styleUrls: ['./file-upload-popup.component.scss']
})
export class FileUploadPopupComponent implements OnInit {

  isCompleted = false;
  storageRef: any;
  file: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FileUploadPopupComponent>,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  handleUploadFile(e) {
    // Get file
    this.file = e.target.files[0];

    // Create ref
    this.storageRef = firebase.storage().ref(this.data.storageName + this.file.name);
    this.isCompleted = true;

  }

  handleSaveFile() {
    // Upload file
    let task = this.storageRef.put(this.file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        console.log(downloadURL)
        this.afs.collection('players').doc(this.data.playerId).update({ 'logoRef': downloadURL });
        this.snackBar.open('Logo was successfully uploaded! 👍', '', {
          duration: 3000
        });
      })
      .catch((err) => {
        this.snackBar.open('Error occured while uploading logo. Try again later 👻', '', {
          duration: 3000
        });
        console.error(err)
      });

    this.dialogRef.close();
  }
}
