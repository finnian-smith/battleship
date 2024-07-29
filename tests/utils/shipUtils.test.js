import {
  createShipObjects,
  attachShipsToElements,
} from "../../src/utils/shipUtils.js";
import Ship from "../../src/Ship.js";

test("createShipObjects() should create a map of ship objects", () => {
  const shipObjects = createShipObjects();
  expect(shipObjects.size).toBe(5);
  expect(shipObjects.get("carrier")).toBeInstanceOf(Ship);
  expect(shipObjects.get("carrier").length).toBe(5);
});

test("attachShipsToElement() should attach ship objects to DOM elements", () => {
  const mockShips = [
    { getAttribute: jest.fn().mockReturnValue("carrier"), shipObject: null },
    { getAttribute: jest.fn().mockReturnValue("battleship"), shipObject: null },
  ];
  const shipObjects = createShipObjects();

  attachShipsToElements(mockShips, shipObjects);

  expect(mockShips[0].shipObject).toBe(shipObjects.get("carrier"));
  expect(mockShips[1].shipObject).toBe(shipObjects.get("battleship"));
});
