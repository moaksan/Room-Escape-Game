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

  var map = {
    ArrowUp: 0,
    ArrowDown: 1,
    ArrowLeft: 2,
    ArrowRight: 3,
  };

  window.addEventListener("keydown", function (event) {
    const modifiers =
      event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    const mapped = map[event.key];
    if (!modifiers) {
      if (mapped !== undefined) {
        if (document.activeElement.tagName !== "INPUT") {
          event.preventDefault();
          self.emit("move", mapped);
        }
      }
    }
  });

  window.addEventListener('')
};
