import Game from "./Game.js";

function renderBoard(gameboard, element) {
  element.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const isShip = gameboard.board.some((item) =>
        item.coordinates.some((coord) => coord[0] === i && coord[1] === j)
      );

      // apply ship styling
      if (isShip) {
        cell.classList.add("ship");
      }

      // apply miss styling
      if (
        gameboard.missedShots.some((coord) => coord[0] === i && coord[1] === j)
      ) {
        cell.classList.add("miss");
        cell.classList.add("clicked");
      }

      // apply hit styling
      if (
        gameboard.hitShots.some((coord) => coord[0] === i && coord[1] === j)
      ) {
        cell.classList.add("hit");
        cell.classList.add("clicked");
      }

      element.appendChild(cell);
    }
  }
}

function renderGame(game, player1Board, player2Board) {
  renderBoard(game.player1.gameboard, player1Board);
  renderBoard(game.player2.gameboard, player2Board);
}

export default { renderBoard, renderGame };
