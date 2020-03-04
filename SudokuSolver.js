class SudokuSolver {

  constructor(passedGrid) {

    this.grid = [];
    this.solvedGrid = [];

    for (let i = 0; i < 9; i++) {
      let newGridE = [];
      for (let j = 0; j < 9; j++) {
        newGridE.push(passedGrid[i][j]);
      }
      this.grid.push(newGridE);
    }
  }

  possible(row, col, num) {
    // checking row
    for (let i = 0; i < 9; i++) {
      if (this.grid[row][i] == num) {
        return false;
      }
    }
    // checking column
    for (let i = 0; i < 9; i++) {
      if (this.grid[i][col] == num) {
        return false;
      }
    }
    //checking 3x3
    let rowStart = Math.floor(row / 3) * 3;
    let colStart = Math.floor(col / 3) * 3;
    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        if (this.grid[i][j] == num) {
          return false;
        }
      }
    }
    // possible
    return true;
  }

  solve() {

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid[row][col] == 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.possible(row, col, num)) {
              this.grid[row][col] = num;
              this.solve();
              this.grid[row][col] = 0;
            }
          }
          return;
        }
      }
    }

    // passGrid(this.grid);

    for (let i = 0; i < 9; i++) {
      let newGridE = [];
      for (let j = 0; j < 9; j++) {
        newGridE.push(this.grid[i][j]);
      }
      this.solvedGrid.push(newGridE);
    }
  }

}
