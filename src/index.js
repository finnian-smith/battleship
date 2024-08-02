import Game from "./Game.js";
import UI from "./UI.js";
import { createShipObjects, attachShipsToElements } from "./utils/shipUtils.js";
import {
  initaliseButtonEvents,
  initialiseDragEvents,
} from "./utils/eventHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game("Player 1", "Player 2");

  const rightSection = document.querySelector(".right-section");
  const player1Board = document.querySelector("#player1-board");

  // render p1 board
  UI.renderBoard(game.player1.gameboard, player1Board);

  // render right section - ships & buttons
  const shipObjects = createShipObjects();
  UI.renderStart(rightSection, shipObjects);
  const ships = document.querySelectorAll(".ship-marker");
  attachShipsToElements(ships, shipObjects);

  // buttons
  const flipButton = document.querySelector(".flip-ships-button");
  const startButton = document.querySelector(".start-button");

  // initialise button events
  initaliseButtonEvents(ships, flipButton, startButton, game, player1Board);

  // initialise drag events
  initialiseDragEvents({ ships, player1Board, game });
});
