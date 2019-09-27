import { DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase';

export interface ITourno {
    'id'?: string;
    'name': string;
    'tournamentType': string;
    'status': string;
    'game': string;
    'country': string;
    'participants': number;
    'playerType': string;
    'endDate': firebase.firestore.Timestamp;
    'startDate': firebase.firestore.Timestamp;
    'entryFee': string;
    'prize': string;
    'description': string;
    'relatedPlayers': Map<any, any>[];
    'rounds': [];
    'userCreated': DocumentReference;
    'userCreatedId'?: string;
    'logoRef': DocumentReference;
}
