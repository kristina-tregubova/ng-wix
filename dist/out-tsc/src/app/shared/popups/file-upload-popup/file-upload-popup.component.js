import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as firebase from 'firebase';
let FileUploadPopupComponent = class FileUploadPopupComponent {
    constructor(data, dialogRef, afs, snackBar) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.afs = afs;
        this.snackBar = snackBar;
        this.isCompleted = false;
    }
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
            console.log(downloadURL);
            this.afs.collection('players').doc(this.data.playerId).update({ 'logoRef': downloadURL });
            this.snackBar.open('Logo was successfully uploaded! 👍', '', {
                duration: 3000
            });
        })
            .catch((err) => {
            this.snackBar.open('Error occured while uploading logo. Try again later 👻', '', {
                duration: 3000
            });
            console.error(err);
        });
        this.dialogRef.close();
    }
};
FileUploadPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-file-upload-popup',
        templateUrl: './file-upload-popup.component.html',
        styleUrls: ['./file-upload-popup.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA))
], FileUploadPopupComponent);
export { FileUploadPopupComponent };
//# sourceMappingURL=file-upload-popup.component.js.map