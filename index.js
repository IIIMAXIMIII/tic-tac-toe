const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY] ];

let current = ZERO;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    const targetCell = findCell(row, col);

    if (targetCell.textContent !== EMPTY) {
        return;
    }

    renderSymbolInCell(current, row, col);
    field[row][col] = current;
    current = current === ZERO ? CROSS : ZERO;
    console.log(`Clicked on cell: ${row}, ${col}`);

    let win = haveWin();
    if (win !== EMPTY) {
        alert(`Победил ${win}`)
    }

    if (isEndGame()) {
        alert("Победила дружба")
    }


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function getTransponse() {
    let newField = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY] ];
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            newField[i][j] = field[j][i];
        }
    }

    return newField;
}

function haveWin () {
    for (const row of field) {
        if (row[0] === row[1] && row[1] === row[2]) {
            return row[0]
        }
    }

    let transponseField = getTransponse();

    for (const row of transponseField) {
        if (row[0] === row[1] && row[1] === row[2]) {
            return row[0]
        }
    }

    if (field[0][0] === field[1][1] && field[1][1] === field[2][2]) {
        return field[0][0]
    }

    if (field[0][2] === field[1][1] && field[1][1] === field[2][0]) {
        return field[0][2]
    }

    return EMPTY
}

function isEndGame () {
    let count = 0;

    for (const row of field) {
        for (const cell of row) {
            if (cell !== EMPTY) {
                count++;
            }
        }
    }

    return count === 9;
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
