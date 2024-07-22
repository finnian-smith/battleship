import Game from "./Game.js";
import UI from "./UI.js";
import Ship from "./Ship.js";
import DragAndDrop from "./DragAndDrop.js";

document.addEventListener("DOMContentLoaded", () => {
  const player1Board = document.querySelector("#player1-board");
  const player2Board = document.querySelector("#player2-board");
  const ships = document.querySelectorAll(".ship-marker");
  const flipButton = document.querySelector(".flip-ships-button");

  const game = new Game("Player 1", "Player 2");

  // Create ship objects and store them in a Map
  const shipObjects = new Map();
  shipObjects.set("carrier", new Ship(5, "carrier", "horizontal"));
  shipObjects.set("battleship", new Ship(4, "battleship", "horizontal"));
  shipObjects.set("cruiser", new Ship(3, "cruiser", "horizontal"));
  shipObjects.set("submarine", new Ship(3, "submarine", "horizontal"));
  shipObjects.set("destroyer", new Ship(2, "destroyer", "horizontal"));

  // attach the corresponding Ship object to each ship element
  ships.forEach((shipElement) => {
    const shipName = shipElement.getAttribute("name");
    shipElement.shipObject = shipObjects.get(shipName);
  });

  UI.renderGame(game, player1Board, player2Board);

  // set up flip button
  flipButton.addEventListener("click", () => UI.flipBoats(ships));

  // set up drag and drop for player 1
  ships.forEach((ship) => {
    ship.addEventListener("dragstart", DragAndDrop.handleDragStart);
  });

  player1Board.addEventListener("dragover", DragAndDrop.handleDragOver);
  player1Board.addEventListener("drop", (event) => {
    DragAndDrop.handleDrop(event, game.player1.gameboard, UI, player1Board);
  });

  // example attack event
  player2Board.addEventListener("click", (event) => {
    const index = Array.from(player2Board.children).indexOf(event.target);
    const x = Math.floor(index / 10);
    const y = index % 10;
    game.currentPlayer.attack(game.player2.gameboard, [x, y]);
    game.switchTurns();
    UI.renderGame(game, player1Board, player2Board);
    if (game.checkGameOver()) {
      alert(`${game.currentPlayer.name} wins!`);
    }
  });
});
