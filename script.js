const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");

const cellSize = 20;
const cellsCount = canvas.width / cellSize;

let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function startGame() {
  snake = [
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 }
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  scoreElement.textContent = score;
  placeFood();

  clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, 120);
}

function placeFood() {
  let foodOnSnake = true;

  while (foodOnSnake) {
    food = {
      x: Math.floor(Math.random() * cellsCount),
      y: Math.floor(Math.random() * cellsCount)
    };

    foodOnSnake = snake.some((part) => part.x === food.x && part.y === food.y);
  }
}

function updateGame() {
  direction = nextDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  if (
    head.x < 0 ||
    head.x >= cellsCount ||
    head.y < 0 ||
    head.y >= cellsCount ||
    snake.some((part) => part.x === head.x && part.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("Игра окончена. Ваш счет: " + score);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    scoreElement.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";
  snake.forEach((part) => {
    ctx.fillRect(part.x * cellSize, part.y * cellSize, cellSize - 1, cellSize - 1);
  });

  ctx.fillStyle = "#000000";
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize - 1, cellSize - 1);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction.y !== 1) {
    nextDirection = { x: 0, y: -1 };
  }
  if (event.key === "ArrowDown" && direction.y !== -1) {
    nextDirection = { x: 0, y: 1 };
  }
  if (event.key === "ArrowLeft" && direction.x !== 1) {
    nextDirection = { x: -1, y: 0 };
  }
  if (event.key === "ArrowRight" && direction.x !== -1) {
    nextDirection = { x: 1, y: 0 };
  }
});

restartButton.addEventListener("click", startGame);

startGame();
