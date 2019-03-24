const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

module.exports = function solveSudoku(matrix) {
    if (solveMatrix(matrix)) {
        return matrix;
    }
}

function solveMatrix(matrix, x, y) {
    let cell = searchZero(matrix);
    if (cell == null){
        return true;
    }
    x = cell.x;
    y = cell.y;
    for (const number of values) {
        if (check(matrix, x, y, number)) {
            matrix[x][y] = number;
            if (solveMatrix(matrix, x, y)){
                return true;
            }
            matrix[x][y] = 0;
        }
   }
    return false;
}

function searchZero(matrix) {
    for (i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 0) return { x: i, y: j };
        }
    }
    return null;
}


function check(matrix, x, y, number) {
    if (checkRow(matrix, x, number) == number) return false;
    if (checkColumn(matrix, y, number) == number) return false;
    if (checkBlock(matrix, x, y, number) == number) return false;
    return true;
}

function checkBlock(matrix, x, y, number) {
    const initX = (Math.floor(x / 3)) * 3;
    const initY = (Math.floor(y / 3)) * 3;
    for (let x = initX; x < initX + 3; x++) {
        for (let y = initY; y < initY + 3; y++) {
            if (matrix[x][y] == number) return number;
        }
    }
}

function checkRow(matrix, x, number) {
    for (const y of matrix[x]) {
        if (y == number) {
            return number;
        }
    }
}

function checkColumn(matrix, y, number) {
    for (let x = 0; x < matrix.length; x++) {
        if (matrix[x][y] == number) {
            return number;
        }
    }
}

