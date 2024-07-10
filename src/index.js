import Game from "./Game.js";
import { renderGame } from "./UI.js";

document.addEventListener("DOMContentLoaded", () => {
  const player1Board = document.querySelector("#player1-board");
  const player2Board = document.querySelector("#player2-board");

  const game = new Game("Player 1", "Player 2");

  // example ship placement
  game.player1.gameboard.placeShip(new Ship(3), [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  game.player2.gameboard.placeShip(new Ship(3), [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  renderGame(game, player1Board, player2Board);
});
