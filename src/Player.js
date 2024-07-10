import Gameboard from "./Gameboard.js";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(opponentGameboard, coordinates) {
    opponentGameboard.receiveAttack(coordinates);
  }
}

export default Player;
