import { GameBoard } from "./GameBoard";
import { Player } from "./Player";
import { Game, TurnResult } from "./Game";
import { FLEET_SIZES } from "../constants/constants";
import { Ship } from "./Ship"
import { randomCoordinates, randomOrientation } from "../utils/random";

const playerBoardEl = document.getElementById("player-board")
const aiBoardEl = document.getElementById("ai-board")
const statusMessageEl = document.getElementById("status-message")

const name = "Exemplo"

const playerGameBoard = new GameBoard()
const aiGameBoard = new GameBoard()

const human = new Player (name, playerGameBoard, "human")
const ai = new Player ("AI", aiGameBoard, "computer")
const game = new Game(human, ai)

export function renderBoard(board: GameBoard, container: HTMLElement, showShips: boolean): void {
    container.replaceChildren();
    for (let y = 0; y < board.size; y++) {
        for (let x = 0; x < board.size; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.dataset.x = x.toString();
            cell.dataset.y = y.toString();

            const state = board.getCellState(x, y);

            if (state === 'hit' || state === 'miss') {
                cell.classList.add(state);
            }

            if (state === 'ship' && showShips) {
                cell.classList.add('ship');
            }

            container.appendChild(cell);
        }
    }
}

function placeFleetRandomly(board: GameBoard) {
    for (const size of FLEET_SIZES) {
        const ship = new Ship(size)
        let placed = false;

        while (!placed) {
            const coordinates = randomCoordinates(board.size)
            const orientation = randomOrientation();
            placed = board.placeShip(ship, coordinates.x, coordinates.y, orientation)
        }
    }
}

placeFleetRandomly(playerGameBoard);
placeFleetRandomly(aiGameBoard);

if (playerBoardEl && aiBoardEl) {
    renderBoard(playerGameBoard, playerBoardEl, true);
    renderBoard(aiGameBoard, aiBoardEl, false);
}

function setStatus(message: string) {
    if (statusMessageEl) statusMessageEl.textContent = message;
}

let gameOver = false;

if (aiBoardEl && playerBoardEl) {
    aiBoardEl.addEventListener('click', (event) => {
        if (gameOver) return;

        const clickedEl = event.target;

        if (!(clickedEl instanceof HTMLElement)) return;
        if (!clickedEl.classList.contains('cell')) return;

        const x = Number(clickedEl.dataset.x);
        const y = Number(clickedEl.dataset.y);

        const result = game.playTurn(x, y);

        if (result === 'repeated') {
            setStatus("Already shot coordinates. Try again!");
            return;
        }

        renderBoard(aiGameBoard, aiBoardEl, false);

        if (result === 'gameover') {
            gameOver = true;
            setStatus(`End of Game! ${game.getCurrentPlayer().name} Won!`);
            return;
        }

        let aiResult: TurnResult | undefined;

        while (game.getCurrentPlayer().type === 'computer') {
            aiResult = game.playTurn();

            if (aiResult === 'gameover') {
                gameOver = true;
                renderBoard(playerGameBoard, playerBoardEl, true);
                setStatus(`End of Game! ${game.getCurrentPlayer().name} won!`);
                return;
            }
        }

        renderBoard(playerGameBoard, playerBoardEl, true);
        const yourShot = result === 'hit' ? "You HIT!" : "You MISSED.";
        const aiShot = aiResult === 'hit' ? "The AI HIT you!" : "The AI MISSED.";
        setStatus(`${yourShot} ${aiShot} Your turn.`);
    })
}