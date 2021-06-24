namespace game{
    export class Ball {
        private game: any;
        private ball: PIXI.Graphics;
        private ballX: number;
        private ballY: number;

        constructor(app: PIXI.Application) {
            this.game = app;
            this.ballX = 0
            this.ballY = 0
            this.drawBall();
        }

        protected drawBall(){
            this.ball = new PIXI.Graphics();
            this.ball.beginFill(GameConstants.brickColor);
            this.ball.drawCircle(this.ballX, this.ballY, GameConstants.ballRadius);
            this.ball.endFill();
            this.updatePositions(this.game.screen.width/2, this.game.screen.height-30);
            this.ball.name = "ball";
        }

        public getBall(): PIXI.Graphics{
            return this.ball;
        }

        public updatePositions(x: number, y: number){
            this.ball.x = x;
            this.ball.y = y;
        }
    }
}