import { GameManager } from "./GameManager.js";
import { InputManager } from "./InputManager.js";
import { HTMLActuator } from "./HTMLActuator.js";

export function App() {
  document.addEventListener("DOMContentLoaded", () => {
    const newGame = new GameManager(InputManager, HTMLActuator);
    console.log(newGame);
  });
}
