import Ship from "./Ship.js";

class Gameboard {
  constructor() {
    this.board = [];
    this.hitShots = [];
    this.missedShots = [];
  }

  placeShip(ship, coordinates) {
    this.board.push({ ship, coordinates });
  }

  receiveAttack(coordinates) {
    const hitShip = this.board.find((item) =>
      item.coordinates.some(
        (coord) => coord[0] === coordinates[0] && coord[1] === coordinates[1]
      )
    );
    if (hitShip) {
      hitShip.ship.hit();
      this.hitShots.push(coordinates);
    } else {
      this.missedShots.push(coordinates);
    }
  }

  allShipsSunk() {
    return this.board.every((item) => item.ship.isSunk());
  }
}

export default Gameboard;
