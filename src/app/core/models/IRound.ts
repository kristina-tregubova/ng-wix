import { DocumentReference } from '@angular/fire/firestore';
export interface IRound {
    games: IGame[];
    nextRoundCandidates: string[];
}

export interface IGame {
    player1: {
        id: string,
        points: string
    };
    player2: {
        id: string,
        points: string
    };
    gameWinner: string;
}
