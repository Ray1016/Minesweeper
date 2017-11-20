export class Board {
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
