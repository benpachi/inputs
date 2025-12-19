import { Shape } from './shape.js';

export class Ellipse extends Shape {
    constructor() {
        super();
        this.name = "ellipse";
    }

    getPath(): string {
        return `M 0 ${this.height/2} ` +
        `A ${this.width/2} ${this.height/2} 0 0 0 ${this.width} ${this.height/2} ` +
        `A ${this.width/2} ${this.height/2} 0 0 0 0 ${this.height/2} Z`
    }
}