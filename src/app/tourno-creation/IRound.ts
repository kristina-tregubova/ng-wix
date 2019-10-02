export interface IRound {
    games: IGame[];
}

export interface IGame {
    'player1': Map<string, string|null>;
    'player2': Map<string, string|null>;
}
