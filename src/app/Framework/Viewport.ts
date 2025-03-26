import { Viewport as PixiViewport } from "pixi-viewport";
import PlayerCharacter from "../Game/PlayerCharacter/PlayerCharacter";

export default class Viewport {
    scene: PixiViewport;
    constructor(app, player: PlayerCharacter) {
        // create viewport
        this.scene = new PixiViewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 1000,
            worldHeight: 1000,
            events: app.renderer.events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
        });
        
        // add the viewport to the stage
        app.stage.addChild(this.scene);
        
        // activate plugins
        this.scene.drag().pinch().wheel().decelerate()
            .follow(player);
        setInterval(() => {
            // this.scene.fit(true, 200,200);
            // viewport.snap(player.position.x, player.position.y);
            // viewport.position.set(player.position.x, player.position.y)
        }, 1000/60);
    }
}