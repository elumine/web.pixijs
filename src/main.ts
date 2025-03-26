import { Application, Assets, Sprite } from "pixi.js";
import PlayerCharacter from "./app/Game/PlayerCharacter/PlayerCharacter";
import World from "./app/Game/World/World";
import Enemy from "./app/Game/Enemy/Enemy";
import Game from "./app/Game/Game";
import Viewport from "./app/Framework/Viewport";

(async () => {
  const app = new Application();
  await app.init({ background: "#111111", resizeTo: window });
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  const game = new Game(app);
})();
