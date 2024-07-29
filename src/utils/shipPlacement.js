import { createShipObjects } from "./shipUtils.js";

function areAllShipsPlaced(gameboard) {
  return gameboard.board.length === 5;
}

function placeComputerShips(gameboard) {
  const shipObjects = createShipObjects();

  for (const ship of shipObjects.values()) {
    let placed = false;
    while (!placed) {
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
      const coordinates = generateRandomCoordinates(ship.length, orientation);
      if (canPlaceShip(gameboard, coordinates)) {
        ship.orientation = orientation;
        gameboard.placeShip(ship, coordinates);
        placed = true;
      }
    }
  }
}

function generateRandomCoordinates(size, orientation) {
  const startX = Math.floor(Math.random() * 10);
  const startY = Math.floor(Math.random() * 10);

  const coordinates = [];
  for (let i = 0; i < size; i++) {
    const x = orientation === "horizontal" ? startX + i : startX;
    const y = orientation === "horizontal" ? startY : startY + i;
    coordinates.push([x, y]);
  }
  return coordinates;
}

function canPlaceShip(gameboard, coordinates) {
  return coordinates.every(
    ([x, y]) =>
      x >= 0 && x < 10 && y >= 0 && y < 10 && !gameboard.isOccupied([x, y])
  );
}

export { areAllShipsPlaced, placeComputerShips };
