import {
  getClickCoordinates,
  handleClickAttack,
  computerTurn,
} from "../../src/utils/gameLogic.js";

describe("gameLogic", () => {
  test("getClickCoordinates() should return the clicked coordinates", () => {
    const mockPlayerBoard = {
      children: Array.from({ length: 100 }, (_, i) => ({
        dataset: { index: String(i) },
      })),
    };

    const mockEvent = { target: mockPlayerBoard.children[15] };

    const coordinates = getClickCoordinates(mockEvent, mockPlayerBoard);
    expect(coordinates).toEqual({ x: 1, y: 5 });
  });
});
