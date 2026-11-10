import { GameBoard } from "./GameBoard";
import { Player } from "./Player";

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

    playTurn(x?: number, y?: number) {
        let adversary = this.getAdversary()
        if (!adversary) throw new Error("Could not determine adversary");
        if(this.turn.type === "human") {
            if (adversary.board.shotHistoric(x, y) === true) return console.log("You already tried this coordinates!")
            this.turn.tryShot(adversary.board, x, y)
        }
        else { 
            this.turn.getShotByAi(adversary.board)
        }
        if (this.checkGameStatus()){
            return console.log(`Fim de jogo! ${this.turn.name} é o vencedor!`)
        }
        else return this.changeTurn()
    }
}