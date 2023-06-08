document.addEventListener("DOMContentLoaded", function () {
  // Wait till the browser is ready to render the game (avoids glitches)
  // window.requestAnimationFrame(function () {
  var manager = new GameManager(4, KeyboardInputManager, HTMLActuator);
  // });
});

function GameManager(map, InputManager, Actuator) {
  this.map = map;
  this.inputManager = new InputManager();
  this.actuator = new Actuator();
  console.log("render");
  this.count = 1;
  // this.inputManager.on("move", this.move.bind(this));
  // this.inputManager.on("restart", this.restart.bind(this));

  // this.setup();
}

function KeyboardInputManager() {
  document.addEventListener("click", function () {
    console.log("click");
  });
  this.count += 1;
}

function HTMLActuator() {}
