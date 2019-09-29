import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DefaultTourno } from './default-tourno';

@Injectable({
  providedIn: 'root'
})
export class TournoCreationService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  createDefaultTourno() {
    const defaultTourno = new DefaultTourno();
    const defaultTournoRef = this.afs.collection('tournaments').add(defaultTourno);
    return defaultTournoRef;
  }

  updateDefaultTourno(ref, data) {
    return ref.update(data);
  }
}
