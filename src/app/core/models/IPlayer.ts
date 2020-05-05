import { DocumentReference } from '@angular/fire/firestore';

export interface IPlayer {
    'id'?: string;
    'name': string;
    'playerType': string;
    'game': string;
    'country': string;
    'userCreated': DocumentReference;
    'userCreatedId'?: string;
    'relatedTournaments': IRelatedTournament[];
    'team': any[];
    'wins': number;
    'games': number;
    'logoRef'?: DocumentReference | string;
}

export interface IRelatedTournament {
    'tournament': DocumentReference,
    'points': string,
    'isWinner': boolean
}
