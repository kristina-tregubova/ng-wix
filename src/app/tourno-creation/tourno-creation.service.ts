import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ITourno } from '../core/models/ITourno';

@Injectable({
  providedIn: 'root'
})
export class TournoCreationService {

  defaultTourno: ITourno = {
    id: null,
    name: null,
    tournamentType: null,
    status: 'pending',
    game: null,
    country: null,
    participants: null,
    playerType: null,
    endDate: null,
    startDate: null,
    entryFee: null,
    prize: null,
    description: null,
    relatedPlayers: null,
    rounds: [],
    userCreated: null,
    userCreatedId: null,
  };

  constructor(
    private afs: AngularFirestore,
  ) { }

  async createDefaultTourno() {

    const defaultTournoRef = this.afs.collection('tournaments').add(this.defaultTourno)
      .then((docRef) => {
        return docRef;
      })

    return defaultTournoRef;
  }

  updateDefaultTourno(ref, data) {
    return ref.update(data);
  }
}
