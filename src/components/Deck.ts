import * as PIXI from 'pixi.js';
import { Card } from './Card';
import * as gsap from "gsap";




export class Deck extends PIXI.Container {
    private cards: Card[] = [];



    constructor(count = 5) {
        super();
        const backFrame = 'back.png';
        const fronts = [];

        const randomFiveCard = this.getRandomFive();
        for (let i = 0; i < count; i++) {
            fronts.push(`card${randomFiveCard[i]}.png`);
        }

        const offset = 8;
        for (let i = 0; i < count; i++) {
            const front = fronts[i];
            const c = new Card(front, backFrame);
            c.x = i * offset;
            c.y = i * offset;
            this.addChild(c);
            this.cards.push(c);
        }

        if (this.cards.length > 0) {
            const first = this.cards[0];
            this.pivot.set(first.x + first.width/2, first.y + first.height/2);
        }


    }

    private getRandomFive(): number[] {
        const arr = Array.from({ length: 54 }, (_, i) => i + 1);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.slice(0, 5);
    }


    get remainingCount() {
        return this.cards.length;
    }


    revealNext() {
        if (this.cards.length === 0) return;
        const top = this.cards.pop()!;
        if (this.cards.length === 0) {
            top.isLastCard = true;
        }
        top.reveal();
        this.emit('updateCounter' as any);
        this.emit('playRevealSound' as any);
    }
}
