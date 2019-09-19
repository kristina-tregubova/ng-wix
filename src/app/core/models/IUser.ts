export interface IUser {
    'uid': string;
    'email': string;
    'createdTournaments'?: [] | null;
    'createdPlayers'?: [] | null;
    'favoritePlayers'?: string[] | null;
    'favoriteTournos'?: string[] | null;
}
