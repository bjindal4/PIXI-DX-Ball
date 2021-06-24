namespace game{
    export class Score extends PIXI.Container{
        private scoreLabel: any;
        private scoreTxt: any;
       
        constructor(app: PIXI.Application) {
            super();
            this.scoreLabel = new PIXI.Text("Score");
            this.scoreTxt = new PIXI.Text("0", {
                fontSize: 30,
            });
            this.scoreTxt.x = 200;
            this.addChild(this.scoreLabel);
            this.addChild(this.scoreTxt);
        }

        public showScore(){
            this.scoreTxt.text = GameConstants.score.toString();
        }

    }
}