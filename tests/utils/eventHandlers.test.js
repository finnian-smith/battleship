import {
  initialiseEventListeners,
  startGame,
} from "../../src/utils/eventHandlers.js";

test("initialiseEventListeners() should attach event listeners", () => {
  const mockShips = [];
  const mockFlipButton = { addEventListener: jest.fn() };
  const mockPlayer1Board = { addEventListener: jest.fn() };
  const mockPlayer2Board = { addEventListener: jest.fn() };
  const mockStartButton = { addEventListener: jest.fn() };
  const mockGame = { player1: { gameboard: {} }, player2: { gameboard: {} } };

  initialiseEventListeners({
    ships: mockShips,
    flipButton: mockFlipButton,
    player1Board: mockPlayer1Board,
    player2Board: mockPlayer2Board,
    game: mockGame,
    startButton: mockStartButton,
  });

  expect(mockFlipButton.addEventListener).toHaveBeenCalled();
  expect(mockPlayer1Board.addEventListener).toHaveBeenCalled();
  expect(mockStartButton.addEventListener).toHaveBeenCalled();
});

test("startGame() should attach click event to player2Board", () => {
  const mockPlayer1Board = {};
  const mockPlayer2Board = { addEventListener: jest.fn() };
  const mockGame = {};

  startGame({
    player1Board: mockPlayer1Board,
    player2Board: mockPlayer2Board,
    game: mockGame,
  });

  expect(mockPlayer2Board.addEventListener).toHaveBeenCalled();
});
