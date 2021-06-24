namespace game{
    export class Life extends PIXI.Container{
        private lifeLabel: any;
        private lifeTxt: any;
        private lifeCounter: number;

        constructor(app: PIXI.Application) {
            super()
            this.lifeCounter = GameConstants.MaxLifeCounter;
            this.lifeLabel = new PIXI.Text("Life");
            this.lifeTxt = new PIXI.Text(this.lifeCounter.toString(), {
                fontSize: 30,
            });
            this.lifeTxt.x = 200;
            this.addChild(this.lifeLabel);
            this.addChild(this.lifeTxt);
            document.addEventListener("updateLife", this.updateLife.bind(this), false);
        }

        public updateLife(){
            this.showLives(GameConstants.lives);
        }

        private showLives(val: number){
            this.lifeTxt.text = val.toString();
        }
    }
}