export interface IRound {
    games: IGame[];
}

export interface IGame {
    player1: {
        id,
        points
    };
    player2: {
        id,
        points
    };
}
