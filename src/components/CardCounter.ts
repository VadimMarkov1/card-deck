import {Container, Text} from "pixi.js";


export class CardCounter extends Container {
    private readonly text: Text;
    constructor () {
        super();
        this.text = new Text({text: 'Cards: 5', style: { fill: 0x00008B, fontSize: 20 }});
        this.addChild(this.text);
    }

    public updateCounter (counter: number) {
        this.text.text = `Cards: ${counter}`;
    }
}