import { Assets, Sprite, Texture, Container } from "pixi.js";
import * as Matter from 'matter-js';
import InputManager from "../../Framework/InputManager";
import Physics from "../../Framework/Physics";
import Object from "../../Framework/Object";
import { Health } from "../../Framework/Health";
import UI from "../../Framework/UI";


export default class PlayerCharacter extends Object {
    inputManager = new InputManager();
    health = new Health(10);

    healthBar = document.createElement("div");

    constructor() {
        super({
            spriteUrl: "/assets/skeleton1/Idle/0_Skeleton_Crusader_Idle_000.png",
            width: 100,
            height: 100,
            scale: { x: 2, y: 2 },
            x: 0,
            y: -100,
            body: {
                static: false,
                friction: 0
            }
        });

        UI.Instance.element.appendChild(this.healthBar);
        this.healthBar.style.position = "absolute";
        this.healthBar.style.top = "0";
        this.healthBar.style.left = "0";
        this.health.onHealthChanged.subscribe((health) => {
            this.healthBar.innerHTML = `Health: ${health}`;
        });

        this.inputManager.onMouseMove.subscribe((mouseInput) => {
            if (this.body) {
                let v = Matter.Vector.create( (mouseInput.x - this.body.position.x), 0 );
                v = Matter.Vector.normalise(v);
                v = Matter.Vector.mult(v, 0.01);
                Matter.Body.applyForce(this.body, this.body.position, v);
            }
        });
    }
}
