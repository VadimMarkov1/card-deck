import * as PIXI from 'pixi.js';
import { Deck } from '../components/Deck';
import { Howl } from 'howler';
import Button from '../components/Button';
import {CardCounter} from "../components/CardCounter";
import { GameData } from '../data/GameData';

export class GameScene extends PIXI.Container {
    private deck!: Deck;
    private clickSfx!: Howl;
    private revealSfx!: Howl;
    private counter!: CardCounter;
    private button!: Button;
    private app: PIXI.Application;
    private gameData: GameData = GameData.getInstance();

    constructor(app: PIXI.Application) {
        super();
        this.app = app;
        this.create();
    }

    private create() {
        this.createDeck();
        this.createButton();
        this.createCounter();
        this.createSounds();
    }

    private createDeck () {
        if (this.deck) {
            this.deck.destroy();
        }
        this.gameData.isLastCard = false;
        this.deck = new Deck(5);
        this.deck.x = this.app.renderer.width / 2;
        this.deck.y = this.app.renderer.height / 2;
        this.addChild(this.deck);
        this.initHandlers();

    }

    private createButton () {
        this.button = new Button('reveal', () => {
            if (this.gameData.canRevealNext) {
                this.clickSfx.play();
                this.deck.revealNext();
            }

        });
        this.button.container.x = this.app.renderer.width / 2 -  this.app.renderer.width / 4;
        this.button.container.y = this.app.renderer.height / 2;
        this.addChild(this.button.container);
    }

    private createCounter () {
        this.counter = new CardCounter();
        this.counter.x = this.app.renderer.width / 2 - this.app.renderer.width / 4 + 30;
        this.counter.y = this.app.renderer.height / 2 + 80;
        this.addChild(this.counter);

    }

    private createSounds () {
        this.clickSfx = new Howl({ src: ['assets/sounds/click.ogg'] });
        this.revealSfx = new Howl({ src: ['assets/sounds/flip.ogg'] });
    }

    private initHandlers () {
        this.deck.on('updateCounter',  () => {
            this.counter.updateCounter(this.deck.remainingCount);
        })

        this.gameData.on('lastCard', (isLastCard: boolean) => {
            if (isLastCard) {
                this.createDeck();
                this.counter.updateCounter(this.deck.remainingCount);
            }
        })

        this.deck.on('playRevealSound', () => {
            this.revealSfx.play();
        })

    }
}
