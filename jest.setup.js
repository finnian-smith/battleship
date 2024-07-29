// jest.setup.js
global.Image = class {
  constructor() {
    this.src = "";
  }
};
