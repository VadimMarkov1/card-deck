import { Application, Assets } from 'pixi.js';
import {LoaderScene} from "../scenes/LoaderScene";
import {GameScene} from "../scenes/GameScene";

export class App {
    private app!: Application;

    async init() {
        this.app = new Application();
        await this.app.init({
            width: window.innerWidth,
            height: window.innerHeight,
            background: 0xf0f0f0,
            resizeTo: window,
            antialias: true
        });
        document.body.appendChild(this.app.canvas);
        const intro = new LoaderScene(this.app);
        this.app.stage.addChild(intro);

        const manifest = {
            bundles: [
                {
                    name: 'game',
                    assets: {
                        cards: 'assets/images/cards.json',
                        click: 'assets/sounds/click.ogg',
                        flip: 'assets/sounds/flip.ogg',
                    }
                }
            ]
        };

        await Assets.init({ manifest });

        await Assets.loadBundle('game', (progress) => {
            intro.updateProgress(progress);
        });

        this.app.stage.removeChild(intro);
        const game = new GameScene(this.app);
        this.app.stage.addChild(game);
    }
}



