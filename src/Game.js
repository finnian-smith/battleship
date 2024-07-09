import Player from "./Player";

class Game {
  constructor(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.currentPlayer = this.player1;
  }

  switchTurns() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  checkGameOver() {
    return (
      this.player1.gameboard.allShipsSunk() ||
      this.player2.gameboard.allShipsSunk()
    );
  }
}

export default Game;
