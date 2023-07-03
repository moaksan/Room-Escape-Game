export function InputManager() {
  this.events = {};

  this.listen();
}

InputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

InputManager.prototype.emit = function (event, data) {
  const callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

InputManager.prototype.listen = function () {
  const self = this;

  const arrowKeyMapping = {
    ArrowUp: "북",
    ArrowDown: "남",
    ArrowLeft: "서",
    ArrowRight: "동",
  };

  /**명령어 해석 */
  const commandInterpret = function (command) {
    const move = /^([동서남북]|[동서남북] 가|[동서남북]쪽으로 가)$/;
    const openDoor = /^((나무문|유리문|잠긴문) (열기|열어|열))$/;
    const useItem = /^((망치|열쇠) 사용 (나무문|유리문|잠긴문))$/;
    const lookObject = /^(.+ (봐|본다|보다))$/;
    const lookRoom = /^(봐|본다|보다)$/;
    const lookItemPossessed = /^소지품$/;

    if (move.test(command)) {
      return { event: "move", data: command[0] };
    } else if (openDoor.test(command)) {
      return { event: "openDoor", data: command.split()[0] };
    } else if (useItem.test(command)) {
      return {
        event: "useItem",
        data: [command.split()[0], command.split()[2]],
      };
    } else if (lookObject.test(command)) {
      return { event: "lookObject", data: command.split()[0] };
    } else if (lookRoom.test(command)) {
      return { event: "lookRoom", data: null };
    } else if (lookItemPossessed.test(command)) {
      return { event: "lookItemPossessed", data: null };
    } else {
      return { event: "commandError", data: null };
    }
  };

  /**키보드 화살표로 이동 */
  window.addEventListener("keydown", function (event) {
    const modifiers =
      event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    const arrowKeyMapped = arrowKeyMapping[event.key];
    if (!modifiers) {
      if (arrowKeyMapped !== undefined) {
        if (document.activeElement.tagName !== "INPUT") {
          event.preventDefault();
          self.emit("move", arrowKeyMapped);
        }
      }
    }
  });

  /**INPUT 창의 입력에 따른 행동 */
  window.addEventListener("keydown", function (e) {
    const modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    if (!modifiers) {
      if (e.key === "Enter") {
        if (
          document.activeElement.tagName === "INPUT" &&
          document.activeElement.className === "command"
        ) {
          e.preventDefault();
          const command = document
            .getElementsByClassName("command")[0]
            .value.trim();
          const { event, data } = commandInterpret(command);
          self.emit(event, data);
        }
      }
    }
  });

  window.addEventListener('')
};
