import Game from "./Game.js";
import UI from "./UI.js";
import Ship from "./Ship.js";
import DragAndDrop from "./DragAndDrop.js";

document.addEventListener("DOMContentLoaded", () => {
  const player1Board = document.querySelector("#player1-board");
  const player2Board = document.querySelector("#player2-board");
  const ships = document.querySelectorAll(".ship-marker");

  const game = new Game("Player 1", "Player 2");

  // example ship placement
  //   game.player1.gameboard.placeShip(new Ship(3), [
  //     [0, 0],
  //     [0, 1],
  //     [0, 2],
  //   ]);
  //   game.player2.gameboard.placeShip(new Ship(3), [
  //     [0, 0],
  //     [0, 1],
  //     [0, 2],
  //   ]);

  UI.renderGame(game, player1Board, player2Board);

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
