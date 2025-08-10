import { EventEmitter } from 'pixi.js';

export class GameData extends EventEmitter {
    private static instance: GameData;
    
    public canRevealNext: boolean = true;
    private _isLastCard: boolean = false;

    private constructor() {
        super();
    }
    
    public static getInstance(): GameData {
        if (!GameData.instance) {
            GameData.instance = new GameData();
        }
        return GameData.instance;
    }

    get isLastCard () {
        return this._isLastCard;
    }

    set isLastCard (value) {
        if (this._isLastCard !== value) {
            this._isLastCard = value;
            this.emit('lastCard', value);
        }
    }
}