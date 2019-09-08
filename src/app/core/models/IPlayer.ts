import { IUser } from './IUser';

export interface IPlayer {
    'name': string,
    'playerType': string,
    'game': string,
    'country': string,
    'userCreated': IUser,
    'relatedTournaments': Array<Map<string, string>>,
    'team'?: Array<Map<string, string>>
}
