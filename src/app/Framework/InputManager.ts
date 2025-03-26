import { BehaviorSubject } from "rxjs";

export interface MouseInputData {
    x: number;
    y: number;
}

export default class InputManager {
    mouseInput: MouseInputData = { x: 0, y: 0 };
    onMouseMove = new BehaviorSubject<MouseInputData>({ x: 0, y: 0 });

    constructor() {
        window.addEventListener('mousemove', (event) => {
            this.mouseInput.x = event.clientX - window.innerWidth / 2;
            this.mouseInput.y = event.clientY - window.innerHeight / 2;
            this.onMouseMove.next(this.mouseInput);
        });
    }
}