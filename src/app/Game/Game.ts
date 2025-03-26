import { Application, Assets, Sprite } from "pixi.js";
import * as Matter from 'matter-js';
import PlayerCharacter from "./PlayerCharacter/PlayerCharacter";
import World from "./World/World";
import Enemy from "./Enemy/Enemy";
import LevelEndingTrigger from "./Triggers/LevelEndingTrigger";
import Viewport from "../Framework/Viewport";

export default class Game {

    player = new PlayerCharacter();;
    
    constructor(public app: Application) {
        const viewport = new Viewport(app, this.player);

        const world = new World(Matter.Vector.create(app.screen.width / 2, app.screen.height / 2));
        viewport.scene.addChild(world);

        viewport.scene.addChild(this.player);
        this.player.health.onDead.subscribe((dead) => {
            if (dead) {
                this.endGame('Game Over!');
            }
        });
      
        const enemy1 = new Enemy(this.player, 100, -50);
        viewport.scene.addChild(enemy1);
        const enemy2 = new Enemy(this.player, 200, -50);
        viewport.scene.addChild(enemy2);
        const enemy3 = new Enemy(this.player, 300, -50);
        viewport.scene.addChild(enemy3);

        const ending = new LevelEndingTrigger(this.player);
        viewport.scene.addChild(ending);
        ending.onPlayerCollision.subscribe(() => {
            this.endGame('Victory!');
        });
    }

    endGame(message: string) {
        alert(message);
        this.app.destroy({
            removeView: true,
        });
    }
}