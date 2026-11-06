import { GameBoard } from "./GameBoard";
import { Player } from "./Player";

export class Game {
    private players: Player[]
    private turn: Player

    constructor (player1: Player, player2: Player) {
        this.players = [player1, player2];
        this.turn = (player1 || player2);
    }

    checkGameStatus (this.players) {

        this.players.every((p) => p.board.areAllShipsSunk())
    }
}