import {
  handleDragStart,
  handleDragOver,
  handleDrop,
  isValidPlacement,
} from "./dragAndDrop.js";
import UI from "../UI.js";
import { areAllShipsPlaced, placeComputerShips } from "./shipPlacement.js";
import { handleClickAttack } from "./gameLogic.js"; // Import the function from gameLogic.js

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
    ship.addEventListener("dragstart", handleDragStart);
  });

  player1Board.addEventListener("dragover", handleDragOver);
  player1Board.addEventListener("drop", (event) => {
    handleDrop(event, game.player1.gameboard, UI, player1Board);
  });

  startButton.addEventListener("click", () => {
    if (areAllShipsPlaced(game.player1.gameboard)) {
      placeComputerShips(game.player2.gameboard, game);
      startGame({ player1Board, player2Board, game });
    } else {
      alert("Please place all ships before starting the game.");
    }
  });
}

function startGame({ player1Board, player2Board, game }) {
  player2Board.addEventListener("click", (event) => {
    handleClickAttack(event, game, player1Board, player2Board);
  });
}

export { initialiseEventListeners, startGame };
