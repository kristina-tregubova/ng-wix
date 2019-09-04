export interface IUser {
    'uid': string;
    'username': string;
    'email': string;
    'password': string;
    'country': string;
    'createdTournaments'?: [] | null;
    'createdPlayers'?: [] | null;
    'joinDate': string;
}
