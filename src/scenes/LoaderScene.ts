import * as PIXI from 'pixi.js';
import {ContainerChild} from "pixi.js";



export class LoaderScene extends PIXI.Container {
    private barBg!: PIXI.Graphics;
    private barFill!: PIXI.Graphics;
    private loadingLabel!: PIXI.Text;
    private app: PIXI.Application;

    constructor(app: PIXI.Application) {
        super();
        this.app = app;
        this.createUI();
    }

    private createUI() {
        const w = this.app.renderer.width;
        const h = this.app.renderer.height;

        const bg = new PIXI.Graphics();
        bg.rect(0, 0, w, h);
        bg.fill(0x1e1e1e);
        this.addChild(bg);

        this.loadingLabel = new PIXI.Text({text: 'Loading 0%', style: { fill: 0xffffff, fontSize: 22 }});

        this.loadingLabel.anchor.set(0.5);
        this.loadingLabel.x = w / 2;
        this.loadingLabel.y = h / 2 - 40;
        this.addChild(this.loadingLabel);

        this.barBg = new PIXI.Graphics();
        const barW = 420;
        const barH = 18;
        this.barBg.roundRect(-barW/2, 0, barW, barH, 6);
        this.barBg.fill(0x444444);
        this.barBg.x = w / 2;
        this.barBg.y = h / 2;
        this.addChild(this.barBg);

        this.barFill = new PIXI.Graphics();
        this.barFill.x = this.barBg.x - barW/2;
        this.barFill.y = this.barBg.y;
        this.addChild(this.barFill);
    }


    public updateProgress(progress: number) {
        const pct = Math.round(progress * 100);
        this.loadingLabel.text = `Loading ${pct}%`;

        const fullW = 420;
        const w = fullW * progress;

        this.barFill.clear();


        this.barFill.roundRect(0, 0, w, 18, 6);
        this.barFill.fill(0x2d8cff);

        this.barFill.x = (this.app.renderer.width / 2) - fullW/2;
        this.barFill.y = this.app.renderer.height / 2;
    }

    private fadeOutAndDone() {
        const fadeTime = 400;
        const start = performance.now();
        const startAlpha = 1;
        const step = (now: number) => {
            const t = Math.min(1, (now - start) / fadeTime);
            this.alpha = startAlpha * (1 - t);
            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                if (this.parent) this.parent.removeChild(this);
            }
        };
        requestAnimationFrame(step);
    }
}
