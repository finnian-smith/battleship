import Game from "../Game.js";
import UI from "../UI.js";
import { createShipObjects, attachShipsToElements } from "./shipUtils.js";
import {
  initialiseButtonEvents,
  initialiseDragEvents,
  clearDragEvents,
} from "./eventHandlers.js";

let game;

function startNewGame() {
  // if game exists -> restart
  if (game) {
    game.player1.gameboard.clear();
    game.player2.gameboard.clear();
  }
  game = new Game("Player 1", "Player 2");

  const rightSection = document.querySelector(".right-section");
  let player1Board = document.querySelector("#player1-board");

  // clear the boards
  player1Board.innerHTML = "";
  rightSection.innerHTML = "";

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

  // clear and re-initialise drag events
  player1Board = clearDragEvents(player1Board);
  initialiseButtonEvents(ships, flipButton, startButton, game, player1Board);
  initialiseDragEvents({ ships, player1Board, game });
}

export default startNewGame;
