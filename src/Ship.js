class Ship {
  constructor(length, name, orientation) {
    this.length = length;
    this.name = name;
    this.orientation = orientation;
    this.hits = 0;
  }

  changeOrientation() {
    if (this.orientation == "horizontal") {
      this.orientation = "vertical";
    } else {
      this.orientation = "horizontal";
    }
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

export default Ship;
