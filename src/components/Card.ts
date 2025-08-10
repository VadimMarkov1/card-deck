import * as PIXI from 'pixi.js';
import * as gsap from "gsap";
import {ContainerChild} from "pixi.js";
import { GameData } from '../data/GameData';

export class Card extends PIXI.Container {
    private gameData: GameData = GameData.getInstance();
    public isFaceUp = false;
    public frontTexture: PIXI.Sprite;
    public backTexture: PIXI.Sprite;
    public isLastCard: boolean;

    constructor(frontFrame: string, backFrame: string, isLastCard: boolean = false) {
        super();
        this.frontTexture = new PIXI.Sprite(PIXI.Texture.from(frontFrame));
        this.backTexture = new PIXI.Sprite(PIXI.Texture.from(backFrame));
        this.isLastCard = isLastCard;
        this.addChild(this.backTexture);
        
        this.frontTexture.y += this.frontTexture.height; 
        this.addChild(this.frontTexture);
        const mask = new PIXI.Graphics();
        mask.rect(0, 0, this.frontTexture.width, this.frontTexture.height);
        mask.fill(0xffffff);
        this.frontTexture.mask = mask;
        this.addChild(mask);
        const targetW = 160;
        const scale = targetW / this.width;
        this.scale.set(scale);
        
    }

    public reveal () {
        this.gameData.canRevealNext = false;
        const tl = gsap.gsap.timeline();
        tl.to(this.frontTexture, {
            y: this.backTexture.y,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => {
                this.backTexture.visible = false;
            }
        })
            .to(this.frontTexture, {
                duration: 1
            })
            .to(this.frontTexture, {
                alpha: 0,
                duration: 0.6,
                ease: "power1.in",
                onComplete: () => {
                    if (this.isLastCard) {
                        this.gameData.isLastCard = true;
                    }
                    this.gameData.canRevealNext = true;
                    this.destroy();
                }
            });


    }
    
}
