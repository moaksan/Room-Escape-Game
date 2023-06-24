// prettier-ignore
const map = {
  size: [8, 9],
  rooms: [
    [1, 5],[1, 6],[1, 7],[2, 4],[2, 5],[3, 1],[3, 2],[3, 3],[3, 4],[4, 2],[4, 4],[5, 2],[5, 4],[5, 5],[6, 5],
  ],
  doors: {
    유리: [[3,3,3]], // [x,y,direction]
    나무: [[2,5,2], [5,5,3]], // (x,y) room의 좌상귀가 문의 경첩
    잠긴: [[1,7,3]] // direction 의미 : 1=up, 2=left, 3=down, 4=right
  },
  items: {
    망치: [[3,1]],
    열쇠: [[6,5]]
  },
};
const character = {
  position: [5, 2],
  direction: 1,
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
};
