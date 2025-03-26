import { Assets, Sprite, Texture, Container } from "pixi.js";
import * as Matter from 'matter-js';
import Physics from "./Physics";

export interface ObjectInitializer {
    spriteUrl: string, width: number, height: number; x: number, y: number;
    scale?: { x: number; y: number };
    body?: {
        static: boolean; friction: number;
    };
}


export default class Object extends Container {
    sprite: Sprite;
    body;
    physicsTick: number;
    spriteMap: Map<string, Sprite> = new Map();
 
    constructor(initializer: ObjectInitializer) {
        super();
        this.init(initializer);
    }

    async addSprite(key: string, url: string, width: number, height: number, x: number, y: number) {
        const sprite = new Sprite(await Assets.load(url));
        sprite.width = width;
        sprite.height = height;
        sprite.x = x;
        sprite.y = y;
        sprite.anchor.set(0.5);
        this.spriteMap.set(key, sprite);
        this.addChild(sprite);
    }
 
    async init(initializer: ObjectInitializer) {
        this.sprite = new Sprite(await Assets.load(initializer.spriteUrl));
        this.sprite.width = initializer.width * (initializer.scale?.x || 1);
        this.sprite.height = initializer.height * (initializer.scale?.y || 1);
        this.sprite.anchor.set(0.5);
        this.addChild(this.sprite);
        if (initializer.body) {
            this.body = Matter.Bodies.rectangle(initializer.x, initializer.y, initializer.width, initializer.height, { isStatic: initializer.body.static });
            this.body.friction = initializer.body.friction;
            Physics.Instance.addBody(this.body);
            this.physicsTick = setInterval(() => {
                this.position.set(this.body.position.x, this.body.position.y);
            }, 1000 / 60);
        }
    }

    destroyObject() {
        if (this.body) {
            Physics.Instance.removeBody(this.body);
        }
        this.removeFromParent();
        this.destroy();
        clearInterval(this.physicsTick);
    }
}
