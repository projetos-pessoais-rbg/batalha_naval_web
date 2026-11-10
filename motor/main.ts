import { GameBoard } from "./GameBoard";
import { Player } from "./Player";
import { Game } from "./Game";
import { FLEET_SIZES } from "../constants/constants";
import { Ship } from "./Ship"

const playerBoardEl = document.getElementById("player-board")
const aiBoardEl = document.getElementById("ai-board")
const statusMessageEl = document.getElementById("status-message")

const name = "Exemplo"

const playerGameBoard = new GameBoard()
const aiGameBoard = new GameBoard()

const human = new Player (name, playerGameBoard, "human")
const ai = new Player ("AI", aiGameBoard, "computer")
const game = new Game(human, ai)

export function renderBoard(container: HTMLElement) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div"); 
            cell.classList.add("cell");            
            
            cell.dataset.x = x.toString();
            cell.dataset.y = y.toString();

            container.appendChild(cell);
        }
    }
}

if (playerBoardEl && aiBoardEl) {
    renderBoard(playerBoardEl);
    renderBoard(aiBoardEl);
}


function placeFleetRandomly(board: GameBoard) {
    const size = board.size
    for (const size of FLEET_SIZES) {
        let ship = new Ship(size)
        
    }

}

