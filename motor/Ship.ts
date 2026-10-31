export class Ship {
    readonly size: number;
    private hits: number;

    constructor(size: number) {
        this.size = size;
        this.hits = 0;
    }

    gotHit(): void {
        this.hits += 1;
    }

    hasSunk(): boolean {
        return this.hits >= this.size;
    }
}