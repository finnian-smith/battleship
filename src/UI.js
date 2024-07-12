import Game from "./Game.js";

function renderBoard(gameboard, element) {
  element.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const ship = gameboard.board.find((item) =>
        item.coordinates.some((coord) => coord[0] === i && coord[1] === j)
      );

      // apply ship styling
      if (ship) {
        cell.classList.add("ship");
        const shipPartIndex = ship.coordinates.findIndex(
          (coord) => coord[0] === i && coord[1] === j
        );
        console.log(shipPartIndex);
        const orientation = ship.ship.orientation;
        const shipName = ship.ship.name;

        cell.style.backgroundImage = `url("../public/assets/images/${shipName}.svg")`;

        // code below still needs tweaking for fitting image in cell
        cell.style.backgroundSize = "cover";

        // calculate background position based on orientation and ship part index
        if (orientation === "horizontal") {
          cell.style.backgroundPosition = `-${shipPartIndex * 100}% 0`;
        } else {
          cell.style.backgroundPosition = `0 -${shipPartIndex * 100}%`;
        }
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

// function renderGame(game, player1Board, player2Board) {
//   renderBoard(game.player1.gameboard, player1Board);
//   renderBoard(game.player2.gameboard, player2Board);
// }

function renderGame(game, player1Board, player2Board) {
  if (game.player1 && game.player1.gameboard) {
    renderBoard(game.player1.gameboard, player1Board);
  }
  if (game.player2 && game.player2.gameboard) {
    renderBoard(game.player2.gameboard, player2Board);
  }
}

export default { renderBoard, renderGame };
