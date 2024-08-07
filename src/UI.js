// renders start view
function renderStart(element, ships) {
  // ship section
  const shipSection = document.createElement("div");
  shipSection.classList.add("ship-section");

  // flip button
  const flipButtonContainer = document.createElement("div");
  flipButtonContainer.classList.add("flip-button");

  const flipButton = document.createElement("button");
  flipButton.classList.add("flip-ships-button");
  flipButton.textContent = "Flip Ships";
  shipSection.appendChild(flipButton);

  // ships
  const shipsContainer = document.createElement("div");
  shipsContainer.classList.add("ships", "horizontal");

  ships.forEach((ship) => {
    const shipMarkerContainer = document.createElement("div");
    shipMarkerContainer.classList.add("ship-marker-container");

    const shipMarker = document.createElement("img");
    shipMarker.setAttribute("src", `../public/assets/images/${ship.name}.svg`);
    shipMarker.classList.add("ship-marker", `${ship.name}`);
    shipMarker.setAttribute("name", `${ship.name}`);
    shipMarker.setAttribute("draggable", "true");
    shipMarker.setAttribute("data-length", `${ship.length}`);
    shipMarker.setAttribute("data-orientation", "horizontal");

    shipMarkerContainer.appendChild(shipMarker);
    shipsContainer.appendChild(shipMarkerContainer);
  });

  shipSection.appendChild(shipsContainer);

  // start button
  const startButton = document.createElement("button");
  startButton.classList.add("start-button");
  startButton.textContent = "Start Game";
  shipSection.appendChild(startButton);

  element.appendChild(shipSection);
}

function flipBoats(ships) {
  const shipsContainer = document.querySelector(".ships");

  // check current orientation and toggle
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

function renderRightSection(element) {
  element.innerHTML = "";
  element.innerHTML = `<p class="player2-title">Opponent</p>
<div id="player2-board" class="board"></div>`;
}

function renderBoard(gameboard, element) {
  element.innerHTML = "";

  const isPlayerBoard = element.id == "player1-board";

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${i}-${j}`;

      const ship = gameboard.board.find((item) =>
        item.coordinates.some((coord) => coord[0] === i && coord[1] === j)
      );

      // apply ship styling
      if (ship && isPlayerBoard) {
        cell.classList.add("ship");
        const shipPartIndex = ship.coordinates.findIndex(
          (coord) => coord[0] === i && coord[1] === j
        );
        const orientation = ship.ship.orientation;
        const shipName = ship.ship.name;

        cell.style.backgroundImage = `url("../public/assets/images/${shipName}.svg")`;

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

function renderGame(game, player1Board, player2Board) {
  if (game.player1 && game.player1.gameboard) {
    renderBoard(game.player1.gameboard, player1Board);
  }
  if (game.player2 && game.player2.gameboard) {
    renderBoard(game.player2.gameboard, player2Board);
  }
}

export default {
  renderStart,
  flipBoats,
  renderBoard,
  renderRightSection,
  renderGame,
};
