import { IUser } from './IUser';
import { DocumentReference } from '@angular/fire/firestore';

export interface IPlayer {
    'id'?: string;
    'name': string;
    'playerType': string;
    'game': string;
    'country': string;
    'userCreated': DocumentReference;
    'relatedTournaments': Map<any, any>[];
    'team': [] | null;
    'points': number;
    'wins': number;
    'games': number;
}
