import Ship from "./Ship.js";

function handleDragStart(event) {
  const name = event.target.getAttribute("name");
  const length = event.target.getAttribute("data-length");
  const orientation = event.target.getAttribute("data-orientation");
  event.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ name, length, orientation })
  );
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event, gameboard, UI, player1Board) {
  event.preventDefault();

  const data = JSON.parse(event.dataTransfer.getData("text/plain"));
  const name = data.name;
  const length = parseInt(data.length);
  const orientation = data.orientation;

  // get target cell coordinates
  const cellIndex = Array.from(event.target.parentNode.children).indexOf(
    event.target
  );
  const x = Math.floor(cellIndex / 10);
  const y = cellIndex % 10;

  // place the ship
  if (isValidPlacement(x, y, length, orientation, gameboard)) {
    const coordinates = [];
    for (let i = 0; i < length; i++) {
      if (orientation === "horizontal") {
        coordinates.push([x, y + i]);
      } else {
        coordinates.push([x + i, y]);
      }
    }
    gameboard.placeShip(new Ship(length, name, orientation), coordinates);

    UI.renderGame(
      { player1: { gameboard } },
      player1Board,
      document.querySelector("#player2-board")
    );

    // disable drag-and-drop and make ship opaque
    const shipMarker = document.querySelector(`.${name}`);
    if (shipMarker) {
      shipMarker.setAttribute("draggable", false);
      shipMarker.classList.add("placed");
    }
  } else {
    alert("Invalid placement");
  }
}

function isValidPlacement(x, y, length, orientation, gameboard) {
  for (let i = 0; i < length; i++) {
    if (orientation === "horizontal") {
      if (
        y + i >= 10 ||
        gameboard.board.some((item) =>
          item.coordinates.some((coord) => coord[0] === x && coord[1] === y + i)
        )
      ) {
        return false;
      }
    } else {
      if (
        x + i >= 10 ||
        gameboard.board.some((item) =>
          item.coordinates.some((coord) => coord[0] === x + i && coord[1] === y)
        )
      ) {
        return false;
      }
    }
  }
  return true;
}

export default {
  handleDragStart,
  handleDragOver,
  handleDrop,
  isValidPlacement,
};
