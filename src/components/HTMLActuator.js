const cellSize = 70;
const gapSize = 5;
export function HTMLActuator() {
  this.mapContainer = document.getElementsByClassName("map-container")[0];
  this.itemContainer = document.getElementsByClassName("item-possessed")[0];
  this.commandContainer = document.getElementsByClassName("command")[0];
  this.messageContainer = document.getElementsByClassName("game-message")[0];
}

HTMLActuator.prototype.updateMap = function (mapData, characterData) {
  this.setGrid(mapData);
  this.updateRoom(mapData);
  this.updateDoor(mapData);
  this.updateItem(mapData);
  this.updateCharacter(characterData, mapData);
};

HTMLActuator.prototype.setGrid = function (mapData) {
  const size = mapData.size;
  this.mapContainer.innerHTML = ``;
  this.mapContainer.style.width = `${size[1] * cellSize}px`;
  this.mapContainer.style.height = `${size[0] * cellSize}px`;
  this.mapContainer.style.gridTemplateColumns = `repeat(${size[1]}, 1fr)`;
  this.mapContainer.style.gridTemplateRows = `repeat(${size[0]}, 1fr)`;

  for (let i = 0; i < size[0]; i++) {
    for (let j = 0; j < size[1]; j++) {
      const element = document.createElement("div");
      element.className = `cell _${i}-${j}`;
      this.mapContainer.appendChild(element);
    }
  }
};
HTMLActuator.prototype.updateRoom = function (mapData) {
  const size = mapData.size;
  const roomData = mapData.rooms;
  for (let i = 0; i < size[0]; i++) {
    for (let j = 0; j < size[1]; j++) {
      const cell = this.mapContainer.getElementsByClassName(
        `cell _${i}-${j}`
      )[0];
      cell.getElementsByClassName("room")[0]?.remove();
      cell.getElementsByClassName("room-wall")[0]?.remove();
    }
  }
  for (let [x, y] of roomData) {
    const cell = this.mapContainer.getElementsByClassName(`cell _${x}-${y}`)[0];
    const element = document.createElement("div");
    element.className = `room _${x}-${y}`;
    const element2 = document.createElement("div");
    element2.className = `room-wall _${x}-${y}`;
    cell.appendChild(element);
    cell.appendChild(element2);
  }
};

HTMLActuator.prototype.updateDoor = function (mapData) {
  const size = mapData.size;
  const doorData = mapData.doors;
  for (let i = 0; i < size[0]; i++) {
    for (let j = 0; j < size[1]; j++) {
      const cell = this.mapContainer.getElementsByClassName(
        `cell _${i}-${j}`
      )[0];
      cell.getElementsByClassName("door")[0]?.remove();
    }
  }
  for (let type in doorData) {
    for (let [x, y, direction] of doorData[type]) {
      const element = document.createElement("div");
      element.className = `door ${x}-${y}-${direction}-${type}`;
      const cell = this.mapContainer.getElementsByClassName(
        `cell _${x}-${y}`
      )[0];
      cell.appendChild(element);
    }
  }
};

HTMLActuator.prototype.updateItem = function (mapData) {
  const size = mapData.size;
  const itemData = mapData.items;
  for (let i = 0; i < size[0]; i++) {
    for (let j = 0; j < size[1]; j++) {
      const cell = this.mapContainer.getElementsByClassName(
        `cell _${i}-${j}`
      )[0];
      cell.getElementsByClassName("item")[0]?.remove();
    }
  }
  for (let type in itemData) {
    for (let [x, y] of itemData[type]) {
      const element = document.createElement("div");
      element.className = `item ${x}-${y}-${type}`;
      const cell = this.mapContainer.getElementsByClassName(
        `cell _${x}-${y}`
      )[0];
      cell.appendChild(element);
    }
  }
};

HTMLActuator.prototype.updateCharacter = function (characterData, mapData) {
  const size = mapData.size;
  const position = characterData.position;
  const direction = characterData.direction;
  for (let i = 0; i < size[0]; i++) {
    for (let j = 0; j < size[1]; j++) {
      const cell = this.mapContainer.getElementsByClassName(
        `cell _${i}-${j}`
      )[0];
      cell.getElementsByClassName("character")[0]?.remove();
    }
  }
  const element = document.createElement("div");
  element.className = `character ${position[0]}-${[position[1]]}`;
  const cell = this.mapContainer.getElementsByClassName(
    `cell _${position[0]}-${position[1]}`
  )[0];
  cell.appendChild(element);
};

HTMLActuator.prototype.updateItemPossessed = function (characterData) {
  const items = characterData.items;
  this.itemContainer.innerHTML = `아이템 : ${items.toString()}`;
};

HTMLActuator.prototype.updateCommand = function (str) {
  this.commandContainer.value = str;
};

HTMLActuator.prototype.updateMessage = function (str) {
  this.messageContainer.innerHTML = str;
};
