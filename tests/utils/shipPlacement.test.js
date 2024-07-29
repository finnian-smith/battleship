import {
  areAllShipsPlaced,
  placeComputerShips,
} from "../../src/utils/shipPlacement.js";

describe("shipPlacement", () => {
  test("areAllShipsPlaced() should return true if all ships are placed", () => {
    const mockGameboard = { board: new Array(5) };
    expect(areAllShipsPlaced(mockGameboard)).toBe(true);
  });

  test("areAllShipsPlaced() should return false if all ships are not placed", () => {
    const mockGameboard = { board: new Array(3) };
    expect(areAllShipsPlaced(mockGameboard)).toBe(false);
  });

  test("placeComputerShips() should place ships on the gameboard", () => {
    const mockGameboard = {
      placeShip: jest.fn(),
      isOccupied: jest.fn().mockReturnValue(false),
    };

    placeComputerShips(mockGameboard);
    expect(mockGameboard.placeShip).toHaveBeenCalled();
  });
});
