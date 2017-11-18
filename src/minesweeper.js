//Part 5

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    //console.log(this._board.playerBoard[rowIndex][columnIndex]);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log("BOMB! Game is over!");
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('You Won!');
      this._board.print();
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    //This instance property will represent the size of the game board and will be used to determine if the game is over or not at the end of each turn.
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  get bombBoard(){
    return this._bombBoard;
  }

  flipTile (rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!.');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] == 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
    console.log(this._numberOfTiles);
    console.log(this._numberOfBombs);
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, +1],
                             [0, -1], [0, +1], [+1, -1],
                             [+1, 0], [+1,  + 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offSet => {
      const neighborRowIndex = rowIndex + offSet[0];
      const neighborColumnIndex = columnIndex + offSet[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows
        && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    console.log(
      this._playerBoard.map(row => row.join(' | ')).join('\n')
    );
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
    let row = [];
      for (let j = 0; j < numberOfColumns;j++) {
            row.push(' ');
      }
      board.push(row);
    }
  	return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
    let row = [];
      for (let j = 0; j < numberOfColumns;j++) {
            row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(numberOfRows * Math.random());
        let randomColumnIndex = Math.floor(numberOfColumns * Math.random());
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
    }
    return board;
  }
}

// const g = new Game(3, 3, 3);
// g.playMove(1,1);


/*
Part 1:
const blankLine = '  |   |  ';
const guessLine = '1 |   |  ';
const bombLine = '  | B |  ';

console.log("This is what an empty board would look like:");
console.log(blankLine);
console.log(blankLine);
console.log(blankLine);

console.log("This is what a board with a guess and a bomb on it would look like:");
console.log(guessLine);
console.log(bombLine);
console.log(blankLine);
*/

// Part 2:
/*
const printBoard = (board) => {
  console.log("Current Board:");
  console.log(board[0].join(' | '));
  console.log(board[1].join(' | '));
  console.log(board[2].join(' | '));
};

let board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']];

printBoard(board);
board[0][1] = '1';
board[2][2] = 'B';
printBoard(board);
*/


//Part 3
// Moved inside the Board class in Part 5
// const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
//   let board = [];
//   for (var i = 0; i < numberOfRows; i++) {
//   let row = [];
//     for (var j = 0; j < numberOfColumns;j++) {
//           row.push(' ');
//     }
//     board.push(row);
//   }
// 	return board;
// };

// Moved inside the Board class in Part 5
// const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
//   let board = [];
//   for (var i = 0; i < numberOfRows; i++) {
//   let row = [];
//     for (var j = 0; j < numberOfColumns;j++) {
//           row.push(null);
//     }
//     board.push(row);
//   }
//
//   numberOfBombsPlaced = 0;
//
//   while (numberOfBombsPlaced < numberOfBombs) {
//       let randomRowIndex = Math.floor(numberOfRows * Math.random());
//       let randomColumnIndex = Math.floor(numberOfColumns * Math.random());
//       if (board[randomRowIndex][randomColumnIndex] !== 'B') {
//         board[randomRowIndex][randomColumnIndex] = 'B';
//         numberOfBombsPlaced++;
//       }
//       // The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.
//   }
//   return board;
// };

// Part4 - step 5 - My solution:
/*
const getNumberOfNeighborBombs = (board, clickedTileRowIndex, clickedTileColumnIndex) => {
  let numberOfNeighborBombs = 0;

  if (board[clickedTileRowIndex][clickedTileColumnIndex] !== 'B') {
    for (var i = clickedTileRowIndex - 1; i <= clickedTileRowIndex + 1; i++) {
      if (i >= 0 && i < board.length){
        for (var j = clickedTileColumnIndex - 1; j <= clickedTileColumnIndex + 1; j++) {
          if (j >= 0 && j < board[clickedTileColumnIndex].length){
            if (board[i][j] === 'B') {
              numberOfNeighborBombs++;
            }
            //console.log(i + ' ' + j);
          }
        }
      }
    }
  } else {
    console.log('Bomb');
  }
  return numberOfNeighborBombs;
};
*/

// Part4 step 5 - CodeCademy solution:

// Moved inside the Board class in Part 5
// const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
//   const neighborOffsets = [[-1, -1], [-1, 0], [-1, +1],
//                            [0, -1], [0, +1], [+1, -1],
//                            [+1, 0], [+1,  + 1]];
//   const numberOfRows = bombBoard.length;
//   const numberOfColumns = bombBoard[0].length;
//   let numberOfBombs = 0;
//   neighborOffsets.forEach(offSet => {
//     const neighborRowIndex = rowIndex + offSet[0];
//     const neighborColumnIndex = columnIndex + offSet[1];
//     if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows
//       && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
//       if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
//         numberOfBombs++;
//       }
//     }
//   });
//   return numberOfBombs;
// };

// Moved inside the Board class in Part 5
// const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
//   if (playerBoard[rowIndex][columnIndex] !== ' ') {
//     console.log('This tile has already been flipped!.');
//     return;
//   } else if (bombBoard[rowIndex][columnIndex] == 'B'){
//     playerBoard[rowIndex][columnIndex] = 'B';
//   } else {
//     playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
//   }
//
// };


// Moved inside the Board class in Part 5
// const printBoard = (board) => {
//   console.log(
//     board.map(row => row.join(' | ')).join('\n')
//   );
// };

// removed in Part 5
// let playerBoard = generatePlayerBoard(3,3);
// let bombBoard = generateBombBoard(3,3,3);
//
// console.log("Player Board: ");
// printBoard(playerBoard);
//
// console.log("Bomb Board: ");
// printBoard(bombBoard);
//
// //console.log(getNumberOfNeighborBombs(bombBoard, 0, 0));
// flipTile(playerBoard, bombBoard, 0, 0);
// console.log('Updated Player Board:');
// printBoard(playerBoard);
