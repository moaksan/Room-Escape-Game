export function HTMLActuator() {
  this.mapContainer = document.getElementsByClassName("map-container")[0];
  this.itemContainer = document.getElementsByClassName("items")[0];
  this.commandContainer = document.getElementsByClassName("command")[0];
  this.messageContainer = document.getElementsByClassName("game-message")[0];
}

HTMLActuator.prototype.updateMap = function (mapData, characterData) {
  this.setGrid(mapData.size);
  this.updateRoom(mapData.rooms);
  this.updateDoor(mapData.doors);
  this.updateItem(mapData.items);
  this.updateCharacter(characterData);
};

HTMLActuator.prototype.setGrid = function (size) {
  this.mapContainer.innerHTML = ``;
  this.mapContainer.style.width = `${size[1] * cellSize}px`;
  this.mapContainer.style.height = `${size[0] * cellSize}px`;
  this.mapContainer.style.gridTemplateColumns = `repeat(${size[1]}, 1fr)`;
  this.mapContainer.style.gridTemplateRows = `repeat(${size[0]}, 1fr)`;

  for (let i = 0; i < size[0]; i++) {
    for (let j = 0; j < size[1]; j++) {
      const element = document.createElement("div");
      element.className = `cell ${i}_${j}`;
      this.mapContainer.appendChild(element);
    }
  }
};
HTMLActuator.prototype.updateRoom = function (roomData) {
  for (let [x, y] of roomData) {
    const element = document.createElement("div");
    element.className = `room ${x}_${y}`;
    const cell = this.mapContainer.getElementsByClassName(`cell ${x}_${y}`)[0];
    cell.appendChild(element);
  }
};

HTMLActuator.prototype.updateDoor = function (doorData) {
  for (let [x, y, direction] of doorData.유리) {
    const element = document.createElement("div");
    element.className = `door ${x}_${y}_${direction}`;
    const room = this.mapContainer.getElementsByClassName(`room ${x}_${y}`)[0];
    room.appendChild(element);
  }
};

HTMLActuator.prototype.updateItem = function () {};

HTMLActuator.prototype.updateCharacter = function () {};

HTMLActuator.prototype.updateItemPossessed = function () {};

HTMLActuator.prototype.updateCommand = function () {};

HTMLActuator.prototype.updateMessage = function () {};

const cellSize = 70;
