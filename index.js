// create gameboard in form of adjacency matrix of zeros
const gameBoard = (function createGameBoard() {
    let board = []
    for (let i = 0; i < 8; i++) {
        const row = [0, 0, 0, 0, 0, 0, 0, 0]; // changes from 0 to 1 when visited by knight
        board.push(row);
    }
    return board;
})()

function getPossibleMoves(square) {
    // simulate knight moves of two steps forward and one 
    // step to side by increasing or decreasing row and 
    // column numbers on board
    const movements = [
        {move: "up-right", steps: [2, 1]},
        {move: "up-left", steps: [2, -1]},
        {move: "down-right", steps: [-2, 1]},
        {move: "down-left", steps: [-2, -1]},
        {move: "right-up", steps: [1, 2]},
        {move: "right-down", steps: [-1, 2]},
        {move: "left-up", steps: [1, -2]},
        {move: "left-down", steps: [-1, -2]}
    ]

    // get possible positions by changing row and column numbers
    let possiblePositions = []
    movements.forEach(movement => {
        possiblePositions.push([square[0] + movement.steps[0], square[1] + movement.steps[1]]);
    })

    // get only positions that are within game board
    const withinBoard = possiblePositions.filter(position => {
        if (position[0] <= 7 && 
            position[0] >= 0 &&
            position[1] <= 7 && 
            position[1] >= 0) return position;
    })

    // get poaitions that haven't been visited before (those having 0 as value on game board matrix)
    const notVisited = withinBoard.filter(position => {
        if (gameBoard[position[0]][position[1]] == 0) return position;
    })

    return notVisited;
}

// retrieves nested path using recursion
function formatPositions(destination, path = []) {
    if (destination.origin == null) return path;

    path.push(destination.value)
    return formatPositions(destination.origin, path)
}

function knightMoves(start, stop) {
    let queue = []
    queue[0] = {origin:null, value:start}; //start with knights position

    while (queue.length > 0) {
        const currentPosition = queue.shift();
        gameBoard[currentPosition.value[0]][currentPosition.value[1]] += 1 // mark visited square on game board

        // get all possible valid knight moves
        const possibleMoves = getPossibleMoves(currentPosition.value);
        possibleMoves.forEach(move => {
            queue.push({origin:currentPosition, value:move})
        })
         
        // search for destination square in queue
        const destination = queue.find(position => {
            if (position.value[0] == stop[0] &&
                position.value[1] == stop[1]) 
                return position;
        })

        if (destination) {
            const path = formatPositions(destination).reverse()
            console.log(`You made it in ${path.length} moves! Here's your path`)
            console.log(start);
            path.forEach(path => console.log(path))
            return;
        };
    }
}

knightMoves([3, 3], [0, 7]);