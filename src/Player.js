import Gameboard from "./Gameboard";

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
