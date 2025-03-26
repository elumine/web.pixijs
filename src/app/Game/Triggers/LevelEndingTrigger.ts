import { Assets, Sprite, Texture, Container } from "pixi.js";
import * as Matter from 'matter-js';
import InputManager from "../../Framework/InputManager";
import Physics from "../../Framework/Physics";
import Object from "../../Framework/Object";
import PlayerCharacter from "../PlayerCharacter/PlayerCharacter";
import { Observable, Subject } from "rxjs";


export default class LevelEndingTrigger extends Object {

    onPlayerCollision = new Subject();

    constructor(public player: PlayerCharacter) {
        super({
            spriteUrl: "/assets/portal.png",
            width: 100,
            height: 100,
            x: 400,
            y: -50,
            body: {
                static: true,
                friction: 0
            }
        });
        const collisionDetection = setInterval(() => {
            const c = Matter.Collision.collides(this.body, this.player.body);
            if (c) {
                clearInterval(collisionDetection);
                this.onPlayerCollision.next(null);
            }
        }, 1000/ 60);
    }
}
