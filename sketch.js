let btn;

let clickedX = -1;
let clickedY = -1;

let sudokuTable = [];
let sudokuSolver;

let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function setup() {

  let canv = createCanvas(541, 541);
  canv.mousePressed(canvasOnClick);
  frameRate(60);

  createP("");
  btn = createButton("Solve");
  btn.mousePressed(solveClick);

  for (let i = 0; i < 9; i++) {
    let sudokuTableE = [];
    for (let j = 0; j < 9; j++) {
      sudokuTableE.push(0);
    }
    sudokuTable.push(sudokuTableE);
  }

  sudokuTable = [
        [ 8, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 3, 6, 0, 0, 0, 0, 0 ],
        [ 0, 7, 0, 0, 9, 0, 2, 0, 0 ],
        [ 0, 5, 0, 0, 0, 7, 0, 0, 0 ],
        [ 0, 0, 0, 0, 4, 5, 7, 0, 0 ],
        [ 0, 0, 0, 1, 0, 0, 0, 3, 0 ],
        [ 0, 0, 1, 0, 0, 0, 0, 6, 8 ],
        [ 0, 0, 8, 5, 0, 0, 0, 1, 0 ],
        [ 0, 9, 0, 0, 0, 0, 4, 0, 0 ]
    ];
}

function draw() {

  background(255);

  for (let i = 0; i < 10; i++) {

    if (i % 3 == 0) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }

    line(i * (width-1) / 9, 0, i * (width-1) / 9, height);
    line(0, i * (height-1) / 9, width, i * (height-1) / 9);
  }
  // line(width - 1, 0, width - 1, height);
  // line(0, height - 1, width, height - 1);

  strokeWeight(3);
  fill(0, 200, 200);
  rect(clickedX * (width-1) / 9, clickedY * (height-1) / 9, (width-1) / 9, (height-1) / 9);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      if (sudokuTable[j][i] > 0) {
        textAlign(CENTER);
        textSize(32);
        strokeWeight(1);
        fill(0);
        let x = i * (width-1) / 9 + ((width-1) / 9 / 2);
        let y = j * (height-1) / 9 + ((height-1) / 9 / 2);
        text(sudokuTable[j][i], x, y);
      }
    }
  }
}

function canvasOnClick() {

  clickedX = Math.floor(mouseX / (width / 9));
  clickedY = Math.floor(mouseY / (height / 9));
}

function keyTyped() {

  if (numbers.indexOf(key) == -1) {
    return;
  }

  if (clickedX == -1 || clickedY == -1) {
    return;
  }

  sudokuTable[clickedY][clickedX] = parseInt(key);
}

function keyPressed() {

  if (clickedX == -1 || clickedY == -1) {
    return;
  }

  if (keyCode === UP_ARROW) {
    clickedY--;
  }
  if (keyCode === DOWN_ARROW) {
    clickedY++;
  }
  if (keyCode === LEFT_ARROW) {
    clickedX--;
  }
  if (keyCode === RIGHT_ARROW) {
    clickedX++;
  }

  if (clickedX > 8) {
    clickedX = 8;
  }
  if (clickedY > 8) {
    clickedY = 8;
  }
  if (clickedX < 0) {
    clickedX = 0;
  }
  if (clickedY < 0) {
    clickedY = 0;
  }
}

function solveClick() {

  sudokuSolver = new SudokuSolver(sudokuTable);
  sudokuSolver.solve();
  passGrid(sudokuSolver.solvedGrid);
}

function passGrid(grid) {

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      sudokuTable[j][i] = grid[j][i];
    }
  }
}
