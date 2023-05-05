function issafe(board, row, col, num) {
    let lrow = row - 1,
        lcol = col - 1,
        rrow = row - 1,
        rcol = col + 1;

    // Check the row and column
    for (let i = 0; i < num; i++) {
        if (board[row][i] > 0 || board[i][col] > 0) {
            return 0;
        }
    }

    // Check the left diagonal
    while (lrow >= 0 && lcol >= 0) {
        if (board[lrow][lcol] > 0) {
            return 0;
        }
        lrow--;
        lcol--;
    }

    // Check the right diagonal
    while (rrow >= 0 && rcol < num) {
        if (board[rrow][rcol] > 0) {
            return 0;
        }
        rrow--;
        rcol++;
    }

    return 1;
}

function solve(board, row, col, num) {
    if (row > num - 1) {
        return 1;
    }
    if (col > num - 1) {
        return 0;
    }
    if (issafe(board, row, col, num)) {
        board[row][col] = 1;
        let col_del = col;
        col = 0;
        if (solve(board, row + 1, col, num)) {
            return 1;
        }
        col = col_del;
        board[row][col] = 0;
    }
    if (solve(board, row, col + 1, num)) {
        return 1;
    }
    return 0;
}

let num = parseInt(prompt("Enter no of rows and cols of board:"));
let board = Array.from({ length: num }, () => new Array(num).fill(0));

if (solve(board, 0, 0, num)) {
    // Create a chessboard using HTML and CSS
    let boardContainer = document.createElement("div");
    boardContainer.className = "board-container";
    document.body.appendChild(boardContainer);

    for (let i = 0; i < num; i++) {
        let row = document.createElement("div");
        row.className = "row";
        boardContainer.appendChild(row);
        for (let j = 0; j < num; j++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            row.appendChild(cell);
            if (board[i][j] === 1) {
                cell.innerHTML = "Q";
            }
        }
    }

    console.log(board);
} else {
    console.log("No solution for this board");
}
