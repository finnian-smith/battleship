import Gameboard from "../src/Gameboard";
import Ship from "../src/Ship";

test("Gameboard can place a ship at specific coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  expect(gameboard.board.length).toBe(1);
});

test("receiveAttack() correctly registers a hit", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  gameboard.receiveAttack([0, 0]);

  expect(ship.hits).toBe(1);
});

test("receiveAttack() correctly registers a miss", () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack([1, 0]);

  expect(gameboard.missedShots.length).toBe(1);
});

test("allShipsSunk() returns true if all ships are sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);

  expect(gameboard.allShipsSunk()).toBe(true);
});

test("allShipsSunk() returns false if all ships are not sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);

  expect(gameboard.allShipsSunk()).toBe(false);
});
