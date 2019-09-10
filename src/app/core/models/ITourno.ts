import { IUser } from './IUser';
import { DocumentReference } from '@angular/fire/firestore';

export interface ITourno {
    'name': string;
    'tournamentType': string;
    'status': string;
    'game': string;
    'country': string;
    'participants': number;
    'playerType': string;
    'endDate': string;
    'startDate': string;
    'entryFee': string;
    'prize': string;
    'description': string;
    'relatedPlayers': Map<any, any>[];
    'rounds': [];
    'userCreated': DocumentReference;
}
