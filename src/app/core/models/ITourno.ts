import { IUser } from './IUser';

export interface ITourno {
    'name': string,
    'tournamentType': string,
    'status': string,
    'game': string,
    'country': string,
    'participants': number,
    'playerType': string,
    'endDate': string,
    'startDate': string,
    'entryFee': string,
    'prize': string,
    'description': string,
    'userCreated': IUser,
    'relatedTournaments': Array<Map<string, string>>,
    'rounds': Array<any>,
}
