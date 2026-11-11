import { GameBoard } from "./GameBoard";
import { Player } from "./Player";

export type TurnResult = 'repeated' | 'hit' | 'miss' | 'gameover';

export class Game {
    private players: Player[]
    private turn: Player

    constructor (player1: Player, player2: Player) {
        this.players = [player1, player2];
        this.turn = player1;
    }

    checkGameStatus () {
        return this.players.some((p) => p.board.areAllShipsSunk())
    }

    changeTurn() {
        if (this.turn === this.players[0]) return this.turn = this.players[1];
        else return this.turn = this.players[0]
    }

    getAdversary() {
        return this.players.find((p) => p !== this.turn)
    }

    getCurrentPlayer() {
        return this.turn
    }

    playTurn(x?: number, y?: number): TurnResult {
        let adversary = this.getAdversary()
        let hit: boolean
        if (!adversary) throw new Error("Could not determine adversary");
        if(this.turn.type === "human") {
            if (x=== undefined || y=== undefined) throw new Error("You need to provide both coordinates");
            if (adversary.board.shotHistoric(x, y) === true) return  'repeated';
            hit = this.turn.tryShot(adversary.board, x, y)
        }
        else {
            hit = this.turn.getShotByAi(adversary.board)
        }
        if (this.checkGameStatus()) return 'gameover';

        this.changeTurn();
        return hit ? 'hit' : 'miss';
    }
}