import Game from "./Game.js";

function flipBoats(ships) {
  const shipsContainer = document.querySelector(".ships");

  // Check current orientation and toggle
  if (shipsContainer.classList.contains("horizontal")) {
    shipsContainer.classList.remove("horizontal");
    shipsContainer.classList.add("vertical");
  } else {
    shipsContainer.classList.remove("vertical");
    shipsContainer.classList.add("horizontal");
  }

  ships.forEach((shipElement) => {
    const shipObject = shipElement.shipObject;

    shipObject.changeOrientation();

    shipElement.style.transform =
      shipObject.orientation == "horizontal" ? "rotate(0deg)" : "rotate(90deg)";
  });
}

function renderBoard(gameboard, element) {
  element.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${i}-${j}`;

      const ship = gameboard.board.find((item) =>
        item.coordinates.some((coord) => coord[0] === i && coord[1] === j)
      );

      // apply ship styling
      if (ship) {
        cell.classList.add("ship");
        const shipPartIndex = ship.coordinates.findIndex(
          (coord) => coord[0] === i && coord[1] === j
        );
        const orientation = ship.ship.orientation;
        const shipName = ship.ship.name;

        cell.style.backgroundImage = `url("../public/assets/images/${shipName}.svg")`;

        // code below still needs tweaking for fitting image in cell
        cell.style.backgroundSize = "cover";
        cell.style.backgroundPosition = `-${shipPartIndex * 100}% 0`;

        if (orientation != "horizontal") {
          cell.style.transform = "rotate(90deg)";
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

export default { flipBoats, renderBoard, renderGame };
