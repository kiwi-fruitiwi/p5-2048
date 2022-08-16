class Direction {
    static UP = new Direction('Up')
    static DOWN = new Direction('Down')
    static LEFT = new Direction('Left')
    static RIGHT = new Direction('Right')

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `${this.name}`;
    }
}

class Gameboard {
    constructor() {}
    slideTiles(direction) {}
    #slideRight() {}
    spawnRandom2() {}
    rotateBoard() {}
    combineRowTiles() {}
    combineAdjacentTiles() {}
    render() {}
}