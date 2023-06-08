document.addEventListener("DOMContentLoaded", () => {
  const newGame = new GameManager(map, InputManager, HTMLActuator);
});

function GameManager(map, InputManager, HTMLActuator) {
  this.map = map();
  this.inputManager = new InputManager();
  this.actuator = new HTMLActuator();
  console.log("new game");
  console.log(this);
}

function map() {
  const map = {
    size: [8, 9],
    rooms: [
      [1, 5],
      [1, 6],
      [1, 7],
      [2, 4],
      [2, 5],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [4, 2],
      [4, 4],
      [5, 2],
      [5, 4],
      [5, 5],
      [6, 5],
    ],
    doors: [],
    items: [],
    startPos: [],
  };

  return map;
}

function InputManager() {}

function HTMLActuator() {}
