import * as Matter from 'matter-js';
const Engine = Matter.Engine,
    Runner = Matter.Runner,
    Composite = Matter.Composite;

export default class Physics {
    static readonly Instance = new Physics();
    engine = Engine.create();

    constructor() {
        var runner = Runner.create();
        Runner.run(runner, this.engine);
    }

    addBody(body: Matter.Body) {
        Composite.add(this.engine.world, body);
    }

    removeBody(body: Matter.Body) {
        Composite.remove(this.engine.world, body);
    }
}
