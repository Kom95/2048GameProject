const boardElement = document.getElementById("board");
const scoreElement = document.getElementById("score");
const statusElement = document.getElementById("status");
const newGameButton = document.getElementById("newGame");

let board;
let score;

function startGame() {
  board = Array.from({ length: 4 }, () => Array(4).fill(0));
  score = 0;
  addRandomTile();
  addRandomTile();
  statusElement.textContent = "Use arrow keys to play.";
  render();
}

function addRandomTile() {
  const empty = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) empty.push([r, c]);
    }
  }

  if (!empty.length) return;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function slide(row) {
  const values = row.filter(value => value !== 0);

  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] === values[i + 1]) {
      values[i] *= 2;
      score += values[i];
      values.splice(i + 1, 1);
    }
  }

  while (values.length < 4) values.push(0);
  return values;
}

function rotateClockwise(matrix) {
  return matrix[0].map((_, column) =>
    matrix.map(row => row[column]).reverse()
  );
}

function move(direction) {
  const before = JSON.stringify(board);

  if (direction === "left") {
    board = board.map(row => slide(row));
  } else if (direction === "right") {
    board = board.map(row => slide([...row].reverse()).reverse());
  } else if (direction === "up") {
    board = rotateClockwise(rotateClockwise(rotateClockwise(board)));
    board = board.map(row => slide(row));
    board = rotateClockwise(board);
  } else if (direction === "down") {
    board = rotateClockwise(board);
    board = board.map(row => slide(row));
    board = rotateClockwise(rotateClockwise(rotateClockwise(board)));
  }

  if (JSON.stringify(board) !== before) {
    addRandomTile();
    render();

    if (has2048()) {
      statusElement.textContent = "🎉 You reached 2048!";
    } else if (isGameOver()) {
      statusElement.textContent = "Game over! Click New Game.";
    }
  }
}

function has2048() {
  return board.some(row => row.includes(2048));
}

function isGameOver() {
  if (board.some(row => row.includes(0))) return false;

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (c < 3 && board[r][c] === board[r][c + 1]) return false;
      if (r < 3 && board[r][c] === board[r + 1][c]) return false;
    }
  }
  return true;
}

function render() {
  boardElement.innerHTML = "";

  board.flat().forEach(value => {
    const tile = document.createElement("div");
    tile.className = value ? "tile" : "tile empty";
    tile.dataset.value = value;
    tile.textContent = value || "";
    boardElement.appendChild(tile);
  });

  scoreElement.textContent = score;
}

document.addEventListener("keydown", event => {
  const keys = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "up",
    ArrowDown: "down"
  };

  if (keys[event.key]) {
    event.preventDefault();
    move(keys[event.key]);
  }
});

newGameButton.addEventListener("click", startGame);

startGame();
