import { GameBoard } from "./GameBoard";
import { randomCoordinates } from "../utils/random";

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

    getShotByAi(opponentBoard: GameBoard) {
        let coordinates = randomCoordinates(opponentBoard.size);
        while (opponentBoard.shotHistoric(coordinates.x, coordinates.y)) {
            coordinates = randomCoordinates(opponentBoard.size);
        }
        return opponentBoard.receiveAttack(coordinates.x, coordinates.y)
    }
}