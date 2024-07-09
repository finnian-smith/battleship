import Player from "../src/Player";
import Gameboard from "../src/Gameboard";
import Ship from "../src/Ship";

test("Player has a gameboard", () => {
  const player = new Player("Player");
  expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test("Player can attack opponent's gameboard", () => {
  const player1 = new Player("Player 1");
  const player2 = new Player("Player 2");

  const ship = new Ship(3);

  player2.gameboard.placeShip(ship, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  player1.attack(player2.gameboard, [0, 0]);

  expect(ship.hits).toBe(1);
});
