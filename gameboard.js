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

    /**
     * helper method that helps our slide function. only valid for indices <
     * arr.length. for 4 cell arrays, {0, 1, 2} are the only valid arguments.
     *
     * 3, [0002] → 0
     * 1, [0200] → 2
     * 0, [2000] → 3
     *
     * @index: the index we are counting from
     * @arr: a 4 cell array of integers
     * @returns: an integer counting the number of zeroes to the *right* of
     * the index in the array. does not include the index
     */
    getConsecutiveZeroesToTheRight(index, arr) {
        let zeroesFound = 0
        if (index >= arr.length-1) /* {0, 1, 2} are the only valid arguments */
            throw new Error(`index ${index} exceeds the bounds of the array`)
        let startIndex = index+1
        for (let i=startIndex; i<arr.length; i++) {
            if (arr[i] !== 0)
                break
            else
                zeroesFound++
        }

        return zeroesFound
    }

    runConsecutiveZeroesTest() {
        const testTuples = [
            /* empty array →
                [0, 0, 0, 0], varying indices */
            {"i": 0, "arr": [0, 0, 0, 0], "ans": 3},
            {"i": 1, "arr": [0, 0, 0, 0], "ans": 2},
            {"i": 2, "arr": [0, 0, 0, 0], "ans": 1},

            /*  [0, 0, 0, 2], varying indices */
            {"i": 0, "arr": [0, 0, 0, 2], "ans": 2},
            {"i": 1, "arr": [0, 0, 0, 2], "ans": 1},
            {"i": 2, "arr": [0, 0, 0, 2], "ans": 0},

            /*  [0, 2, 2, 2] */
            {"i": 0, "arr": [0, 2, 2, 2], "ans": 0},
            {"i": 1, "arr": [0, 2, 2, 2], "ans": 0},
            {"i": 2, "arr": [0, 2, 2, 2], "ans": 0},

            /*  [0, 2, 0, 2] */
            {"i": 0, "arr": [0, 2, 0, 2], "ans": 0},
            {"i": 1, "arr": [0, 2, 0, 2], "ans": 1},
            {"i": 2, "arr": [0, 2, 0, 2], "ans": 0},

            /* [2, 0, 0, 0] */
            {"i": 0, "arr": [0, 2, 0, 0], "ans": 0},
            {"i": 1, "arr": [0, 2, 0, 0], "ans": 2},
            {"i": 2, "arr": [0, 2, 0, 0], "ans": 1},
        ]

        for (const test of testTuples) {
            console.log(test)
            console.assert(this.getConsecutiveZeroesToTheRight(
                int(test['i']),
                test['arr']) === int(test['ans']))
        }
    }

    /** input: a 4 cell array
     *  @return: a new 4 cell array after performing 'slide right'
     */
    static slideRight(row) {
        /*  the input row array has [0, 1, 2, 3]. starting from [2], move
            cells right one space.

            move cell value right until no empty cells remain to its right
         */
        const arr = Array.from({length: 4})
        for (const i in arr) {
            console.log(i)
        }




        return []
    }


    static runTests() {
        this.#slideRight_Tests()
    }

    static #slideRight_Tests() {
        console.assert(Gameboard.slideRight([2, 0, 0, 0]) === [])
    }


    /** input: a 4 cell array
        @return: a new 4 cell array, combining all adjacent cells of equal value
     */
    combineAdjacentCells() {}



    slideTiles(direction) {}
    spawnRandom2() {}
    rotateBoardCW() {}
    rotateBoardCCW() {}
    combineRowTiles() {}
    render() {}
}