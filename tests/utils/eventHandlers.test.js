import { initialiseButtonEvents } from "../../src/utils/eventHandlers.js";

test("initialiseButtonEvents() should attach event listeners", () => {
  const mockShips = [];
  const mockFlipButton = { addEventListener: jest.fn() };
  const mockPlayer1Board = { addEventListener: jest.fn() };
  const mockStartButton = { addEventListener: jest.fn() };
  const mockGame = { player1: { gameboard: {} }, player2: { gameboard: {} } };

  initialiseButtonEvents(
    mockShips,
    mockFlipButton,
    mockStartButton,
    mockGame,
    mockPlayer1Board
  );

  expect(mockFlipButton.addEventListener).toHaveBeenCalled();
  expect(mockStartButton.addEventListener).toHaveBeenCalled();
});
