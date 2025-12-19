import { Shape } from './shape.js';

export class Rectangle extends Shape {
    constructor() {
        super();
        this.name = "rectangle";
    }

    getPath(): string {
        return `M 0 0 ` +
        `L ${this.width} 0 ` +
        `L ${this.width} ${this.height} ` +
        `L 0 ${this.height}` +
        `L 0 0 Z`
    }
}