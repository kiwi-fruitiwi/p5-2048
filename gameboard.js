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
     * helper method that assists our slide function. only valid for indices <
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

    runConsecutiveZeroesTests() {
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

            /*  [2, 0, 0, 0] */
            {"i": 0, "arr": [0, 2, 0, 0], "ans": 0},
            {"i": 1, "arr": [0, 2, 0, 0], "ans": 2},
            {"i": 2, "arr": [0, 2, 0, 0], "ans": 1},
        ]

        for (const i in testTuples) {
            const test = testTuples[i]
            const index = int(test['i'])
            const testCase = test['arr']
            const expectedResult = test['ans']
            const zeroesResult = this.getConsecutiveZeroesToTheRight(index, testCase)

            if (PRINT_TESTS) {
                console.log(`${i.padStart(2, '0')}.zeroes🥝 [${testCase}]→[${expectedResult}] ?= [${zeroesResult}]`)
            }

            console.assert(zeroesResult === expectedResult)
        }
    }

    /** helper method that assists in making a move on the game board.
     *  @arr: the 4-cell array we're performing a 'slide right' command on
     *  @return: a new 4 cell array after performing 'slide right'
     */
    #slideRight(arr) {
        let result = [...arr] /* idiom for array.copy() */
        /* iterate through indices {2, 1, 0} in our 4-cell array */
        for (let i=result.length-2; i>=0; i--) {
            const zeroes = this.getConsecutiveZeroesToTheRight(i, result)
            // console.log(zeroes)
            if (zeroes >= 0) {
                result = this.#swapCells(i, i+zeroes, result)
            }
        }

        return result
    }

    /** returns new array with values at indices x and y swapped from the
        original
     */
    #swapCells(x, y, arr) {
        const result = [...arr] /* idiom for array.copy() */

        const tmp = result[x]
        result[x] = result[y]
        result[y] = tmp

        return result
    }

    runSlideRightTests() {
        const testTuples = [
            /* basic single cell slides */
            {'arr': [0, 0, 0, 0], 'ans': [0, 0, 0, 0]},
            {'arr': [0, 0, 0, 2], 'ans': [0, 0, 0, 2]},
            {'arr': [0, 0, 2, 0], 'ans': [0, 0, 0, 2]},
            {'arr': [0, 2, 0, 0], 'ans': [0, 0, 0, 2]},
            {'arr': [2, 0, 0, 0], 'ans': [0, 0, 0, 2]},

            /* slides with arr[3] filled */
            {'arr': [0, 2, 0, 2], 'ans': [0, 0, 2, 2]},
            {'arr': [2, 0, 0, 2], 'ans': [0, 0, 2, 2]},

            /* test mid-array multi-swap */
            {'arr': [2, 0, 2, 0], 'ans': [0, 0, 2, 2]},
            {'arr': [2, 2, 0, 0], 'ans': [0, 0, 2, 2]},
            {'arr': [2, 2, 2, 0], 'ans': [0, 2, 2, 2]},

            /* no slides */
            {'arr': [2, 2, 2, 2], 'ans': [2, 2, 2, 2]}
        ]

        for (const i in testTuples) {
            const test = testTuples[i]

            const testCase = test['arr']
            const expectedResult = test['ans']
            const slideResult = this.#slideRight(testCase)

            if (PRINT_TESTS) {
                console.log(`${i.padStart(2, '0')}.slide→🎚️ [${testCase}]→[${expectedResult}] ?= [${slideResult}]`)
            }

            console.assert(
                this.#arrayEquals(slideResult, expectedResult)
            )
        }
    }

    /* simple array equality, assuming primitive values */
    #arrayEquals(a, b) {
        return Array.isArray(a) && Array.isArray(b) &&
            a.length === b.length &&
            a.every((value, index) => value === b[index]);
    }

    /**
        @return: a new 4 cell array, combining all adjacent cells of equal
     value in the input array
     */
    #combineAdjacentCells(row) {
        let result = [...row] /* idiom for array.copy() */
        /* iterate through indices {2, 1, 0} in our 4-cell array */
        for (let i=result.length-2; i>=0; i--) {
            if (result[i] === result[i+1]) { /* works for the 0 case */
                result[i+1] *= 2
                result[i] = 0
            }
        }
        return result
    }

    runCombineAdjacentTests() {
        const testTuples = [
            {'arr': [0, 0, 0, 0], 'ans': [0, 0, 0, 0]},

            /* basic single cell combines */
            {'arr': [0, 0, 2, 2], 'ans': [0, 0, 0, 4]},
            {'arr': [0, 2, 2, 0], 'ans': [0, 0, 4, 0]},
            {'arr': [2, 2, 0, 0], 'ans': [0, 4, 0, 0]},

            /* double combines */
            {'arr': [2, 2, 2, 2], 'ans': [0, 4, 0, 4]},
            {'arr': [2, 2, 4, 4], 'ans': [0, 4, 0, 8]},
            {'arr': [128, 128, 128, 128], 'ans': [0, 256, 0, 256]}
        ]

        for (const i in testTuples) {
            const test = testTuples[i]

            const testCase = test['arr']
            const expectedResult = test['ans']
            const combineResult = this.#combineAdjacentCells(testCase)

            if (PRINT_TESTS) {
                console.log(`${i.padStart(2, '0')}.combine🌟 [${testCase}]→[${expectedResult}] ?= [${combineResult}]`)
            }

            console.assert(
                this.#arrayEquals(combineResult, expectedResult)
            )
        }
    }

    /** use slideRight, combineAdjacentCells, and slideRight to complete a
        single move in the RIGHT direction
        @returns: a new 4-cell array containing the game state of one row
            after slideRight, combine, slideRight
     */
    #executeMoveRight(row) {
        return this.#slideRight(this.#combineAdjacentCells(this.#slideRight(row)))
    }

    runMoveRightTests() {
        const testTuples = [
            {'arr': [0, 0, 0, 0], 'ans': [0, 0, 0, 0]},

            /* basic */
            {'arr': [0, 0, 2, 2], 'ans': [0, 0, 0, 4]},

            /*  */
            {'arr': [0, 2, 2, 2], 'ans': [0, 0, 2, 4]},
            {'arr': [2, 2, 2, 0], 'ans': [0, 0, 2, 4]},

            /*  */
            {'arr': [0, 2, 2, 0], 'ans': [0, 0, 0, 4]},
            {'arr': [2, 2, 2, 2], 'ans': [0, 0, 4, 4]},
            {'arr': [0, 4, 0, 4], 'ans': [0, 0, 0, 8]},
            {'arr': [16, 0, 16, 0], 'ans': [0, 0, 0, 32]}
        ]

        for (const i in testTuples) {
            const test = testTuples[i]

            const testCase = test['arr']
            const expectedResult = test['ans']
            const combineResult = this.#executeMoveRight(testCase)

            if (PRINT_TESTS) {
                console.log(`${i.padStart(2, '0')}.moveR🌊 [${testCase}]→[${expectedResult}] ?= [${combineResult}]`)
            }

            console.assert(
                this.#arrayEquals(combineResult, expectedResult)
            )
        }
    }

    slideTiles(direction) {}
    spawnRandom2() {}
    rotateBoardCW() {}
    rotateBoardCCW() {}
    combineRowTiles() {}
    render() {}
}