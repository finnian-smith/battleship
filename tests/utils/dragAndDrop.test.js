import {
  handleDragStart,
  handleDragOver,
  handleDrop,
  isValidPlacement,
} from "../../src/utils/dragAndDrop";

describe("dragAndDrop", () => {
  test("handleDragStart() should be defined", () => {
    expect(handleDragStart).toBeDefined();
  });

  test("handleDragOver() should be defined", () => {
    expect(handleDragOver).toBeDefined();
  });

  test("handleDrop() should be defined", () => {
    expect(handleDrop).toBeDefined();
  });
});
describe("isValidPlacement", () => {
  const gameboard = {
    board: [
      {
        coordinates: [
          [0, 0],
          [0, 1],
          [0, 2],
        ],
      },
    ],
  };

  test("should return true for a valid horizontal placement", () => {
    expect(isValidPlacement(3, 0, 3, "horizontal", gameboard)).toBe(true);
  });

  test("should return false for an invalid horizontal placement (out of bounds)", () => {
    expect(isValidPlacement(8, 8, 3, "horizontal", gameboard)).toBe(false);
  });

  test("should return false for an invalid horizontal placement (collision)", () => {
    expect(isValidPlacement(0, 1, 3, "horizontal", gameboard)).toBe(false);
  });

  test("should return true for a valid vertical placement", () => {
    expect(isValidPlacement(3, 3, 3, "vertical", gameboard)).toBe(true);
  });

  test("should return false for an invalid vertical placement (out of bounds)", () => {
    expect(isValidPlacement(8, 8, 3, "vertical", gameboard)).toBe(false);
  });

  test("should return false for an invalid vertical placement (collision)", () => {
    expect(isValidPlacement(0, 0, 3, "vertical", gameboard)).toBe(false);
  });
});
