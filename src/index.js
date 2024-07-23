import Game from "./Game.js";
import UI from "./UI.js";
import Ship from "./Ship.js";
import DragAndDrop from "./DragAndDrop.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game("Player 1", "Player 2");

  const player1Board = document.querySelector("#player1-board");
  const player2Board = document.querySelector("#player2-board");
  const ships = document.querySelectorAll(".ship-marker");
  const flipButton = document.querySelector(".flip-ships-button");
  const startButton = document.querySelector(".start-button");

  const shipObjects = createShipObjects();
  attachShipsToElements(ships, shipObjects);

  UI.renderGame(game, player1Board, player2Board);

  initialiseEventListeners({
    ships,
    flipButton,
    player1Board,
    player2Board,
    game,
    startButton,
  });
});

function createShipObjects() {
  const shipObjects = new Map();
  shipObjects.set("carrier", new Ship(5, "carrier", "horizontal"));
  shipObjects.set("battleship", new Ship(4, "battleship", "horizontal"));
  shipObjects.set("cruiser", new Ship(3, "cruiser", "horizontal"));
  shipObjects.set("submarine", new Ship(3, "submarine", "horizontal"));
  shipObjects.set("destroyer", new Ship(2, "destroyer", "horizontal"));

  return shipObjects;
}

function attachShipsToElements(ships, shipObjects) {
  ships.forEach((shipElement) => {
    const shipName = shipElement.getAttribute("name");
    shipElement.shipObject = shipObjects.get(shipName);
  });
}

function initialiseEventListeners({
  ships,
  flipButton,
  player1Board,
  player2Board,
  game,
  startButton,
}) {
  flipButton.addEventListener("click", () => UI.flipBoats(ships));

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", DragAndDrop.handleDragStart);
  });

  player1Board.addEventListener("dragover", DragAndDrop.handleDragOver);
  player1Board.addEventListener("drop", (event) => {
    DragAndDrop.handleDrop(event, game.player1.gameboard, UI, player1Board);
  });

  startButton.addEventListener("click", () => {
    if (areAllShipsPlaced(game.player1.gameboard)) {
      placeComputerShips(game.player2.gameboard);
      startGame({ player1Board, player2Board, game });
    } else {
      alert("Please place all ships before starting the game.");
    }
  });
}

function areAllShipsPlaced(gameboard) {
  return gameboard.board.length === 5;
}

function placeComputerShips(gameboard) {
  const shipObjects = createShipObjects();

  for (const ship of shipObjects.values()) {
    let placed = false;
    while (!placed) {
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
      const coordinates = generateRandomCoordinates(ship.length, orientation);
      if (canPlaceShip(gameboard, coordinates)) {
        ship.orientation = orientation;
        gameboard.placeShip(ship, coordinates);
        placed = true;
      }
    }
  }
}

function canPlaceShip(gameboard, coordinates) {
  return coordinates.every(
    ([x, y]) =>
      x >= 0 && x < 10 && y >= 0 && y < 10 && !gameboard.isOccupied([x, y])
  );
}

function generateRandomCoordinates(size, orientation) {
  const startX = Math.floor(Math.random() * 10);
  const startY = Math.floor(Math.random() * 10);

  const coordinates = [];
  for (let i = 0; i < size; i++) {
    const x = orientation === "horizontal" ? startX + i : startX;
    const y = orientation === "horizontal" ? startY : startY + i;
    coordinates.push([x, y]);
  }
  return coordinates;
}

function startGame({ player1Board, player2Board, game }) {
  player2Board.addEventListener("click", (event) => {
    handleClickAttack(event, game, player1Board, player2Board);
  });
}

function getClickCoordinates(event, playerBoard) {
  const index = Array.from(playerBoard.children).indexOf(event.target);
  const x = Math.floor(index / 10);
  const y = index % 10;
  return { x, y };
}

function handleClickAttack(event, game, player1Board, player2Board) {
  if (!game.checkGameOver() && game.currentPlayer === game.player1) {
    if (
      event.target.classList.contains("hit") ||
      event.target.classList.contains("miss")
    ) {
      alert("You have already hit that cell - please choose another");
      return;
    }

    const { x, y } = getClickCoordinates(event, player2Board);
    game.player1.attack(game.player2.gameboard, [x, y]);

    if (event.target.classList.contains("ship")) {
      event.target.classList.add("hit");
    } else {
      event.target.classList.add("miss");
    }

    if (game.checkGameOver()) {
      alert(`${game.player1.name} wins!`);
    } else {
      game.switchTurns();
      UI.renderGame(game, player1Board, player2Board);
      setTimeout(() => computerTurn(game, player1Board, player2Board), 1000);
    }
  }
}

function computerTurn(game, player1Board, player2Board) {
  const player1BoardCells = document.querySelectorAll("#player1-board div");
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * player1BoardCells.length);
  } while (
    player1BoardCells[randomIndex].classList.contains("hit") ||
    player1BoardCells[randomIndex].classList.contains("miss")
  );

  const { x, y } = getClickCoordinates(
    { target: player1BoardCells[randomIndex] },
    player1Board
  );
  game.player2.attack(game.player1.gameboard, [x, y]);

  if (player1BoardCells[randomIndex].classList.contains("ship")) {
    player1BoardCells[randomIndex].classList.add("hit");
  } else {
    player1BoardCells[randomIndex].classList.add("miss");
  }

  if (game.checkGameOver()) {
    alert(`${game.player2.name} wins!`);
  } else {
    game.switchTurns();
    UI.renderGame(game, player1Board, player2Board);
  }
}
