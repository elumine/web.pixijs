import { Assets, Container, Sprite, Texture } from "pixi.js";
import * as Matter from 'matter-js';
import PlayerCharacter from "../PlayerCharacter/PlayerCharacter";
import Physics from "../../Framework/Physics";
import Object from "../../Framework/Object";


export default class World extends Object {
    background: Sprite;

    constructor(
        public origin: Matter.Vector
    ) {
        super({
            spriteUrl: "/assets/green.png",
            width: 10000,
            height: 10,
            x: 0,
            y: 5,
            body: {
                static: true,
                friction: 0
            }
        });
        this.addSprite('bg', '/assets/terrace/terrace.png', 1000, 500, 0, -50);
    }
}
