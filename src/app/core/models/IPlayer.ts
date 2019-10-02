import { IUser } from './IUser';
import { DocumentReference } from '@angular/fire/firestore';

export interface IPlayer {
    'id'?: string;
    'name': string;
    'playerType': string;
    'game': string;
    'country': string;
    'userCreated': DocumentReference;
    'userCreatedId'?: string;
    'relatedTournaments': Map<any, any>[];
    'team': any[] | null;
    'points': number;
    'wins': number;
    'games': number;
    'logoRef': DocumentReference | string;
}
