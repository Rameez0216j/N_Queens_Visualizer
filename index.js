// JavaScript code for generating the chessboard and solving the n-queens problem
let boardSizeInput = document.getElementById("board-size-input");
let generateBtn = document.getElementById("generate-btn");
let num=null;
let board =null;

generateBtn.addEventListener("click",async function () {
    console.log("event triggered");
    let boardSize = parseInt(boardSizeInput.value);
    num=boardSize;
    if (!isNaN(boardSize) && boardSize > 0) {
        // Clear the board and create a new one
        let Board = document.querySelector(".board");
        Board.innerHTML = "";
        Board.style.width = `${boardSize * 50}px`;
        Board.style.height = `${boardSize * 50}px`;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                let square = document.createElement("div");
                square.classList.add("square");
                if ((i + j) % 2 === 0) {
                    square.classList.add("white");
                } else {
                    square.classList.add("black");
                }
                Board.appendChild(square);
            }
        }

        // Solve the n-queens problem and update the board with the solution
        console.log("calling solve queen");
        await solveNQueens(boardSize);
        console.log("returned from solve queen");
    }
    boardSizeInput.value = "";
});

async function solveNQueens(num) {

    console.log("Inside solveQueen");
    board = Array.from({ length: num }, () => new Array(num).fill(0));
    console.log("Testing");
    console.log(board);
    console.log("Called solve");
    let ans = solve(board, 0, 0, num);
    console.log("Returned from solve");
    if (ans) {
        console.log("Solved");
        console.log(board);
    } else {
        console.log("No solution for this board");
    }
}

async function isSafe(board, row, col, num) {
    console.log("inside isSafe");
    let lRow = row - 1,
        lCol = col - 1,
        rRow = row - 1,
        rCol = col + 1;

    // Check the row and column
    for (let i = 0; i < num; i++) {
        if (board[row][i] > 0 || board[i][col] > 0) {
            return 0;
        }
    }

    // Check the left diagonal
    while (lRow >= 0 && lCol >= 0) {
        if (board[lRow][lCol] > 0) {
            return 0;
        }
        lRow--;
        lCol--;
    }

    // Check the right diagonal
    while (rRow >= 0 && rCol < num) {
        if (board[rRow][rCol] > 0) {
            return 0;
        }
        rRow--;
        rCol++;
    }

    return 1;
}

async function solve(board, row, col, num) {
    console.log("inside Solve");
    if (row > num - 1) {
        return 1;
    }
    if (col > num - 1) {
        return 0;
    }
    let valid_curr= await isSafe(board, row, col, num);
    if (valid_curr) {
        board[row][col] = 1;
        let col_del = col;
        showPlacement(row, col);
        await new Promise((r) => setTimeout(r, 1000));
        col = 0;

        let valid_next_row=await isSafe(board, row+1, col, num);
        if (valid_next_row) {
            return 1;
        }
        showRemoval(row, col);
        await new Promise((r) => setTimeout(r, 1000));
        col = col_del;
        board[row][col] = 0;
    }
    let valid_next_col=await isSafe(board, row, col+1, num);
    if (valid_next_col) {
        return 1;
    }
    return 0;
}

function showPlacement(row, col) {
    let square = document.querySelector(`.square:nth-child(${row * num + col + 1})`);
    square.classList.add("queen");
}

function showRemoval(row, col) {
    let square = document.querySelector(`.square:nth-child(${row * num + col + 1})`);
    square.classList.remove("queen");
}
