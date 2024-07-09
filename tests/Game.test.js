import Game from "../src/Game";
import Ship from "../src/Ship";

test("Game initialises with 2 players", () => {
  const game = new Game("Player 1", "Player 2");
  expect(game.player1.name).toBe("Player 1");
  expect(game.player2.name).toBe("Player 2");
});

test("Game switches turns correctly", () => {
  const game = new Game("Player 1", "Player 2");
  game.switchTurns();
  expect(game.currentPlayer.name).toBe("Player 2");
  game.switchTurns();
  expect(game.currentPlayer.name).toBe("Player 1");
});

test("Game recognises when all ships are sunk", () => {
  const game = new Game("Player 1", "Player 2");
  const ship = new Ship(3);
  game.player1.gameboard.placeShip(ship, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  game.player1.gameboard.receiveAttack([0, 0]);
  game.player1.gameboard.receiveAttack([0, 1]);
  game.player1.gameboard.receiveAttack([0, 2]);
  expect(game.checkGameOver()).toBe(true);
});
