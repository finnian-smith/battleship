import Game from "./Game.js";
import UI from "./UI.js";
import { createShipObjects, attachShipsToElements } from "./utils/shipUtils.js";
import { initialiseEventListeners } from "./utils/eventHandlers.js";

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
