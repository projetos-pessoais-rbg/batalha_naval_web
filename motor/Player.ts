import { GameBoard } from "./GameBoard";

export class Player {
    readonly name: string;
    readonly board: GameBoard;
    readonly type: ('human' | 'computer');

    constructor (name: string, board: GameBoard, type: ('human' | 'computer'),) {
        this.name = name;
        this.board = board;
        this.type = type;
    }

    tryShot(opponentBoard: GameBoard, x: number, y: number) {
        return opponentBoard.receiveAttack(x, y);
    }

    generateRandomCoordinate() {
        return {x: Math.floor(Math.random()*this.board.size), y:Math.floor(Math.random()*this.board.size)}
    }

    getShotByAi(opponentBoard: GameBoard) {
        let coordinates = this.generateRandomCoordinate();
        while (opponentBoard.shotHistoric(coordinates.x, coordinates.y)) {
            coordinates = this.generateRandomCoordinate();
        }
        return opponentBoard.receiveAttack(coordinates.x, coordinates.y)
    }
}