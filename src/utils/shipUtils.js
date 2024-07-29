import Ship from "../Ship.js";

function createShipObjects() {
  const shipObjects = new Map();
  shipObjects.set("carrier", new Ship(5, "carrier", "horizontal"));
  shipObjects.set("battleship", new Ship(4, "battleship", "horizontal"));
  shipObjects.set("cruiser", new Ship(3, "cruiser", "horizontal"));
  shipObjects.set("submarine", new Ship(3, "submarine", "horizontal"));
  shipObjects.set("destroyer", new Ship(2, "destroyer", "horizontal"));

  return shipObjects;
}

function attachShipsToElements(ships, shipObjects) {
  ships.forEach((shipElement) => {
    const shipName = shipElement.getAttribute("name");
    shipElement.shipObject = shipObjects.get(shipName);
  });
}

export { createShipObjects, attachShipsToElements };
