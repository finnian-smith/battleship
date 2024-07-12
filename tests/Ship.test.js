import Ship from "../src/Ship";

test("Ship created with correct length", () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
});

test("changeOrientation() changes orientation from horizontal to vertical", () => {
  const ship = new Ship(3, "carrier", "horizontal");
  ship.changeOrientation();
  expect(ship.orientation).toBe("vertical");
});

test("hit() increases the hit count", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("isSunk() returns true when hits >= length", () => {
  const ship = new Ship(3);
  for (let i = 0; i < ship.length; i++) {
    ship.hit();
  }
  expect(ship.isSunk()).toBe(true);
});

test("isSunk() returns false when hits < length", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
