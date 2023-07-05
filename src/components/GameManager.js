// prettier-ignore
const map = {
  size: [8, 9],
  rooms: {
    '1,5':'서 북','1,6':'남 북','1,7':'남 북','2,4':'서 북','2,5':'동 남','3,1':'서 남 북','3,2':'북','3,3':'남 북','3,4':'동','4,2':'동 서','4,4':'동 서','5,2':'동 서 남','5,4':'서 남','5,5':'동 북','6,5':'동 서 남'
  },
  doors: {
    '3,3':{type: '유리문', direction: '남'},
    '2,5':{type: '나무문', direction: '동'},
    '5,5':{type: '나무문', direction: '남'},
    '1,7':{type: '잠긴문', direction: '남'},
    // (x,y) room의 좌상귀가 문의 경첩
  },
  items: {
    '3,1': ['망치'],
    '6,5': ['열쇠']
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
  this.utils = new Utils();

  this.setUp();
}

export function Utils() {}
Utils.prototype.canMove = function (curPos, nexPos, direction, mapData) {
  const rooms = mapData.rooms;
  const doors = mapData.doors;

  const curPosKey = curPos.join(",");
  if (curPosKey in rooms) {
    if (!rooms[curPosKey].split().includes(direction)) {
      doors.forEach((type) => {
        if (type == "깨진유리") return;
        doors[type].forEach((el) => {
          const [x, y, d] = el;
          const tmp = [];
          if (d == "동") {
            tmp = [x, y, x - 1, y];
          } else if (d == "서") {
            tmp = [x, y - 1, x - 1, y - 1];
          } else if (d == "남") {
            tmp = [x, y, x, y - 1];
          } else if (d == "북") {
            tmp = [x - 1, y, x - 1, y - 1];
          }

          if ([...curPos, ...nexPos] == tmp || [...nexPos, ...curPos] == tmp) {
            return false;
          }
        });
      });
      return true;
    }
  }
  return false;
};

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
  const nexPos = [-1, -1];

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
    return;
  }

  if (this.utils.canMove(curPos, nexPos, direction, this.map)) {
    this.character.position = nexPos;
    this.actuator;
  }
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
