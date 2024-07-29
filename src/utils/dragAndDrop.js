import Ship from "../Ship.js";

const customDragImage = new Image();
customDragImage.src = "../public/assets/images/drop-marker.svg";

function handleDragStart(event) {
  const shipElement = event.target;
  const {
    name,
    shipObject: { length, orientation },
  } = shipElement;
  event.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ name, length, orientation })
  );
  event.dataTransfer.setDragImage(customDragImage, 0, 0);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event, gameboard, UI, player1Board) {
  event.preventDefault();

  const data = JSON.parse(event.dataTransfer.getData("text/plain"));
  const { name, length, orientation } = data;

  const cellIndex = Array.from(event.target.parentNode.children).indexOf(
    event.target
  );
  const x = Math.floor(cellIndex / 10);
  const y = cellIndex % 10;

  if (isValidPlacement(x, y, length, orientation, gameboard)) {
    const coordinates = [];
    for (let i = 0; i < length; i++) {
      coordinates.push(orientation === "horizontal" ? [x, y + i] : [x + i, y]);
    }
    gameboard.placeShip(new Ship(length, name, orientation), coordinates);

    UI.renderGame(
      { player1: { gameboard } },
      player1Board,
      document.querySelector("#player2-board")
    );

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
    const [newX, newY] = orientation === "horizontal" ? [x, y + i] : [x + i, y];
    if (
      newX >= 10 ||
      newY >= 10 ||
      gameboard.board.some((item) =>
        item.coordinates.some((coord) => coord[0] === newX && coord[1] === newY)
      )
    ) {
      return false;
    }
  }
  return true;
}

export { handleDragStart, handleDragOver, handleDrop, isValidPlacement };
