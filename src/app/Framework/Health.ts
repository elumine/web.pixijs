import { BehaviorSubject } from "rxjs";


export class Health {

    onDead = new BehaviorSubject(false);
    onHealthChanged = new BehaviorSubject(0);
    
    constructor(public points: number) {
        this.onHealthChanged.next(points);
    }

    applyDamage(damage: number) {
        if (this.isAlive) {
            this.points = Math.max(0, this.points - damage);
            this.onHealthChanged.next(this.points);
            if (this.isDead) {
                this.onDead.next(true);
            }
        }
    }

    get isAlive() {
        return this.points > 0;
    }

    get isDead() {
        return !this.isAlive;
    }
}