import { Ship } from "./Ship"
export class GameBoard {
    readonly size: number;
    readonly maxShipCell: number;
    private grid: (Ship | null)[][];
    private ships: Ship[];

    constructor (size: number = 10) {
        this.size = size;
        this.maxShipCell = Math.floor(size*size*0.17);
        this.grid = this.createGrid(size);
        this.ships = [];
    }

    private createGrid(size:number): (Ship | null)[][] {
        const grid: (Ship | null)[][] = [];
        for (let y = 0; y < size; y++) {
            grid.push(new Array(size).fill(null))
        }
        return grid;
    }

    canPlaceShip(ship: Ship, x: number, y: number, orientation: 'horizontal' | 'vertical'): boolean {
        let totalShips = 0;
        this.ships.forEach((ship) => {
            totalShips+=ship.size;
        })
        if(this.maxShipCell < (totalShips + ship.size) ) {
            console.log("Hit ship limit.")
            return false;
        }
        if(x < 0 || y <0) {
            console.log("Initial coordinates are invalid (negative coordinate)!")
            return false;
        }
        if(orientation === 'horizontal') {
            if (x + ship.size > this.size) {
                console.log("Ship exceeds horizontal limit!")
                return false;
            }
        } else if (orientation === 'vertical') {
            if(y + ship.size > this.size) {
                console.log("Ship exceeds vertical limit!")
                return false;
            }
        }
        if (orientation === 'horizontal'){
            for (let i=0; i<ship.size; i++) {
                if (this.grid[y][x+i] !== null) {
                    console.log("This position is already taken!")
                    return false;
                }
            }
        }
        if (orientation === 'vertical'){
            for (let i=0; i<ship.size; i++) {
                if (this.grid[y+i][x] !== null) {
                    console.log("This position is already taken!")
                    return false;
                }
            }
        }
        return true;
    }
}