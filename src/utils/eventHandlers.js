import { handleDragStart, handleDragOver, handleDrop } from "./dragAndDrop.js";
import UI from "../UI.js";
import { areAllShipsPlaced, placeComputerShips } from "./shipPlacement.js";
import { handleClickAttack } from "./gameLogic.js";

// initialise buttons events
function initaliseButtonEvents(
  ships,
  flipButton,
  startButton,
  game,
  player1Board
) {
  flipButton.addEventListener("click", () => UI.flipBoats(ships));

  startButton.addEventListener("click", () => {
    if (areAllShipsPlaced(game.player1.gameboard)) {
      const rightSection = document.querySelector(".right-section");
      UI.renderRightSection(rightSection);
      const player2Board = document.querySelector("#player2-board");
      UI.renderBoard(game.player2.gameboard, player2Board);
      placeComputerShips(game.player2.gameboard, game);
      startGame({ player1Board, player2Board, game });
    } else {
      alert("Please place all ships before starting the game.");
    }
  });
}

// initialise drag events
function initialiseDragEvents({ ships, player1Board, game }) {
  ships.forEach((ship) => {
    ship.addEventListener("dragstart", handleDragStart);
  });

  player1Board.addEventListener("dragover", handleDragOver);
  player1Board.addEventListener("drop", (event) => {
    handleDrop(event, game.player1.gameboard, UI, player1Board);
  });
}

// start game function
function startGame({ player1Board, player2Board, game }) {
  player2Board.addEventListener("click", (event) => {
    handleClickAttack(event, game, player1Board, player2Board);
  });
}

export { initaliseButtonEvents, initialiseDragEvents };
