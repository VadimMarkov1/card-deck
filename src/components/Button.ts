import * as PIXI from 'pixi.js';
import {Container, ContainerEvents, FederatedPointerEvent, Graphics} from "pixi.js";


export default class Button {
    container: PIXI.Container<Graphics | PIXI.Text>;
    private bg: PIXI.Graphics;
    private label: PIXI.Text;

    constructor(text: string, onClick: () => void) {
        this.container = new PIXI.Container<Graphics | PIXI.Text>();

        this.bg = new PIXI.Graphics();

        this.bg.roundRect(0, 0, 140, 60, 8);
        this.bg.fill(0x2d8cff);

        this.bg.eventMode = 'static';
        this.bg.cursor = 'pointer';
        this.bg.addEventListener('pointerdown', (event: FederatedPointerEvent) => {
            onClick();
            this.bg.alpha = 0.85;
            setTimeout(() => (this.bg.alpha = 1), 120);
        });

        this.label = new PIXI.Text({text: text, style: { fontSize: 20, fill: 0xffffff }});
        this.label.anchor.set(0.5);
        this.label.x = 70;
        this.label.y = 30;

        this.container.addChild(this.bg, this.label);
    }
}
