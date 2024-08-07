import UI from "../UI.js";
import startNewGame from "./gameInit.js";

function getClickCoordinates(event, playerBoard) {
  const index = Array.from(playerBoard.children).indexOf(event.target);
  const x = Math.floor(index / 10);
  const y = index % 10;
  return { x, y };
}

function markCell(event, hit) {
  if (hit) {
    event.target.classList.add("hit");
  } else {
    event.target.classList.add("miss");
  }
}

function handlePlayerAttack(game, x, y, event) {
  if (!event.target.classList.contains("cell")) {
    console.error("Invalid target:", event.target);
    return false;
  }

  game.player1.attack(game.player2.gameboard, [x, y]);
  if (event.target.classList.contains("ship")) {
    markCell(event, true);
  } else {
    markCell(event, false);
  }

  return true;
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
    const validClick = handlePlayerAttack(game, x, y, event);

    if (validClick) {
      UI.renderGame(game, player1Board, player2Board);
      if (game.checkGameOver()) {
        showGameOverModal(game.player1.name);
      } else {
        game.switchTurns();
        setTimeout(() => computerTurn(game, player1Board, player2Board), 1000);
      }
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
    markCell({ target: player1BoardCells[randomIndex] }, true);
  } else {
    markCell({ target: player1BoardCells[randomIndex] }, false);
  }

  UI.renderGame(game, player1Board, player2Board);

  if (game.checkGameOver()) {
    showGameOverModal(game.player2.name);
  } else {
    game.switchTurns();
  }
}

function showGameOverModal(player) {
  const modal = document.querySelector(".game-over-modal");
  const messageElement = document.querySelector(".game-over-message");
  const closeButton = document.querySelector(".close-button");
  const restartButton = document.querySelector(".restart-button");

  messageElement.textContent = `${player} wins!`;
  modal.style.display = "block";

  closeButton.onclick = () => (modal.style.display = "none");

  restartButton.onclick = () => {
    modal.style.display = "none";
    restartGame();
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function restartGame() {
  startNewGame();
}

export {
  handleClickAttack,
  computerTurn,
  getClickCoordinates,
  markCell,
  handlePlayerAttack,
};
