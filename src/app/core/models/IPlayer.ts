import { DocumentReference } from '@angular/fire/firestore';

export interface IPlayer {
    'id'?: string;
    'name': string;
    'playerType': string;
    'game': string;
    'country': string;
    'userCreated': DocumentReference;
    'userCreatedId'?: string;
    'relatedTournaments': {'tournament': DocumentReference, 'points': string, 'isWinner': boolean}[];
    'team': any[] | null;
    'wins': number;
    'games': number;
    'logoRef': DocumentReference | string;
}
