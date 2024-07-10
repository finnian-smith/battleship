import Game from "./Game.js";

function renderBoard(board, element) {
  element.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (
        board.some((item) =>
          item.coordinates.some((coord) => coord[0] === i && coord[1] === j)
        )
      ) {
        cell.classList.add("ship");
      }
      element.appendChild(cell);
    }
  }
}

function renderGame(game, player1Board, player2Board) {
  renderBoard(game.player1.gameboard.board, player1Board);
  renderBoard(game.player2.gameboard.board, player2Board);
}

export default { renderBoard, renderGame };
