// prettier-ignore
const map = {
  size: [8, 9],
  rooms: [
    [1, 5],[1, 6],[1, 7],[2, 4],[2, 5],[3, 1],[3, 2],[3, 3],[3, 4],[4, 2],[4, 4],[5, 2],[5, 4],[5, 5],[6, 5],
  ],
  doors: {
    유리: [[3,3,'남']], // [x,y,direction]
    나무: [[2,5,'서'], [5,5,'남']], // (x,y) room의 좌상귀가 문의 경첩
    잠긴: [[1,7,'남']] // direction 의미 : 1=up, 2=left, 3=down, 4=right
  },
  items: {
    망치: [[3,1]],
    열쇠: [[6,5]]
  },
};
const character = {
  position: [5, 2],
  direction: "북",
  items: [],
};

export function GameManager(InputManager, HTMLActuator) {
  this.map = map;
  this.character = character;
  this.inputManager = new InputManager();
  this.actuator = new HTMLActuator();

  this.setUp();
}

GameManager.prototype.setUp = function () {
  this.actuator.updateMap(this.map, this.character);
  this.actuator.updateItemPossessed(this.character);
  this.actuator.updateCommand("");
  this.actuator.updateMessage("");

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("openDoor", this.move.bind(this));
  this.inputManager.on("useItem", this.move.bind(this));
  this.inputManager.on("lookObject", this.move.bind(this));
  this.inputManager.on("lookRoom", this.move.bind(this));
  this.inputManager.on("lookItemPossessed", this.move.bind(this));
  this.inputManager.on("commandError", this.move.bind(this));
};

GameManager.prototype.move = function (direction) {
  const curPos = this.character.position;
  let nexPos = [-1, -1];
  const rooms = this.map.rooms;
  const doors = this.map.doors;

  if (direction === "동") {
    nexPos = [curPos[0], curPos[1] + 1];
  } else if (direction === "서") {
    nexPos = [curPos[0], curPos[1] - 1];
  } else if (direction === "남") {
    nexPos = [curPos[0] + 1, curPos[1]];
  } else if (direction === "북") {
    nexPos = [curPos[0] - 1, curPos[1]];
  } else {
    console.log("direction error");
  }

  if (nexPos !== [-1, -1] || (curPos in rooms && nexPos in rooms && doors)) {
  }
  this.character.position = nexPos;
  this.actuator;
};
GameManager.prototype.openDoor = function (door) {
  console.log(door);
};
GameManager.prototype.useItem = function (item) {
  console.log(direction);
};
GameManager.prototype.lookObject = function (object) {
  console.log(direction);
};
GameManager.prototype.lookRoom = function () {
  console.log(direction);
};
GameManager.prototype.lookItemPossessed = function () {
  console.log(direction);
};
GameManager.prototype.commandError = function () {
  console.log(direction);
};
