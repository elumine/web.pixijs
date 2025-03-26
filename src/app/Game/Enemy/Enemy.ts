import { Assets, Sprite, Texture, Container } from "pixi.js";
import * as Matter from 'matter-js';
import InputManager from "../../Framework/InputManager";
import Physics from "../../Framework/Physics";
import Object from "../../Framework/Object";
import PlayerCharacter from "../PlayerCharacter/PlayerCharacter";


export enum EnemyState {
    Idle,
    Dead
}

export default class Enemy extends Object {

    state = EnemyState.Idle;

    constructor(public player: PlayerCharacter, x: number, y: number) {
        super({
            spriteUrl: "/assets/skeleton2/Idle/0_Skeleton_Crusader_Idle_000.png",
            width: 50,
            height: 50,
            scale: { x: 2, y: 2 },
            x: x,
            y: y,
            body: {
                static: false,
                friction: 0
            }
        });
        const collisionDetection = setInterval(() => {
            const c = Matter.Collision.collides(this.body, this.player.body);
            if (c) {
                this.state = EnemyState.Dead;
                clearInterval(collisionDetection);
                this.player.health.applyDamage(1);
                setTimeout(() => {
                    this.destroyObject();
                }, 100);
            }
        }, 1000/ 60);
    }
}
