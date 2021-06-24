/// <reference path="./views/PowerUp.ts" />
/// <reference path="./views/Paddle.ts" />
/// <reference path="./views/Ball.ts" />
/// <reference path="./views/Score.ts" />
/// <reference path="./views/Life.ts" />
/// <reference path="./views/MessageView.ts" />
/// <reference path="./views/Bricks.ts" />

namespace game {
    export class GameView {
        private game: PIXI.Application;
        private brickContainer: Brick;
        private paddle: PIXI.Graphics;
        private ball: PIXI.Graphics;
        private power1: PowerUp;
        private power2: PowerUp;
        private dx: number;
        private dy: number;
        private score: number = 0;
        private lives: number = 3;
        private powerCollisionCount: number = 0;
        private scoreView: Score;
        private lifeView: Life;
        private messageView: MessageView;
        private powerUpShowCount: number =0;
        private powerUpNumber: number = Math.floor(Math.random() * 3);

        constructor(app: PIXI.Application) {
            this.game = app;

            this.brickContainer = new Brick();
            app.stage.addChild(this.brickContainer);            

            let ballInstance = new Ball(app);
            this.ball = ballInstance.getBall();
            app.stage.addChild(this.ball);
            this.power1 = new PowerUp(app, "power1", GameConstants.power1Color);            
            this.power1.setPosition(50, 100);
            this.power2 = new PowerUp(app, "power2", GameConstants.power2Color);            
            this.power2.setPosition(100, 100);
            let paddleInstance = new Paddle(app);
            this.paddle = paddleInstance.getPaddle();
            app.stage.addChild(this.paddle);
            PowerUp.setPaddle(this.paddle);

            this.scoreView = new Score(app);
            app.stage.addChild(this.scoreView);

            this.lifeView = new Life(app);
            app.stage.addChild(this.lifeView);
            this.lifeView.position.set(250, 0);

            this.messageView = new MessageView(app);
            app.stage.addChild(this.messageView);

            this.dx = GameConstants.InitSpeedDelta;
            this.dy = -GameConstants.InitSpeedDelta;

            document.addEventListener("collision", this.onCollision.bind(this), false);
            document.addEventListener("powerMissed", this.onPowerMiss.bind(this), false);
            document.addEventListener("showPower", this.showPowerUp.bind(this), false);
        }

        public removeListeners(){
            document.removeEventListener("collision", this.onCollision.bind(this));
            document.removeEventListener("powerMissed", this.onPowerMiss.bind(this));
            document.removeEventListener("showPower", this.showPowerUp.bind(this));
        }

        private onPowerMiss() {
            this.powerCollisionCount++;
        }

        private onCollision(){
            console.log("collision with power");
            this.powerCollisionCount++;
            if(this.powerCollisionCount === 1){
                document.dispatchEvent(GameEvents.SCALE_PADDLE);                
            } else if (this.powerCollisionCount === 2){
                this.dx = this.dy = GameConstants.InitSpeedDelta = GameConstants.PowerUpBallSpeedDelta + GameConstants.InitSpeedDelta;
            }
        }

        private showPowerUp() {
            this.powerUpShowCount++;
            if(this.powerUpShowCount === 1) {
                this.power1.setPosition(Math.abs(this.ball.x-50), Math.abs(this.ball.y-50));
                this.power1.setPowerVisible(true);
            } else if(this.powerUpShowCount === 2){
                this.power2.setPosition(Math.abs(this.ball.x-50), Math.abs(this.ball.y-50));
                this.power2.setPowerVisible(true);
            }
        }

        private checkHit() {           
            for (let c = 0; c < GameConstants.brickColumnCount; c++) {
                for (let r = 0; r < GameConstants.brickRowCount; r++) {
                    let b = this.brickContainer.getBricks()[c][r];
                    if (b.status == 1) {
                        if (this.ball.x > b.x && this.ball.x < b.x + GameConstants.brickWidth && this.ball.y > b.y && this.ball.y < b.y + GameConstants.brickHeight) {
                            this.dy = -this.dy;
                            b.status = 0;
                            GameConstants.score++;
                            this.scoreView.showScore();
                            if(GameConstants.score === this.powerUpNumber || GameConstants.score === this.powerUpNumber + 5){
                                document.dispatchEvent(GameEvents.SHOW_POWER);  
                            }
                            this.brickContainer.getChildByName("brick_" + c + "_" + r).visible = false;                            
                            if (GameConstants.score == GameConstants.brickRowCount * GameConstants.brickColumnCount) {
                                GameConstants.isWin = true;
                                document.dispatchEvent(GameEvents.SHOW_MESSAGE);                                 
                            }
                        }
                    }
                }
            }
        }

        public updateView() {
            this.checkHit();           
            this.power1.update();
            this.power2.update();

            if (this.ball.x + this.dx > this.game.screen.width - GameConstants.ballRadius || this.ball.x + this.dx < GameConstants.ballRadius) {
                this.dx = -this.dx;
            }
            if (this.ball.y + this.dy < GameConstants.ballRadius) {
                this.dy = -this.dy;
            }
            else if (this.ball.y + this.dy > this.game.screen.height - GameConstants.ballRadius) {
                if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + GameConstants.paddleWidth) {
                    this.dy = -this.dy;
                }
                else {
                    GameConstants.lives--;
                    document.dispatchEvent(GameEvents.UPDATE_LIFE);  
                    if (!GameConstants.lives) {
                        GameConstants.isWin = false;
                        document.dispatchEvent(GameEvents.SHOW_MESSAGE);  
                    }
                    else {
                        this.ball.x = this.game.screen.width / 2;
                        this.ball.y = this.game.screen.height - 30;
                        this.dx = GameConstants.InitSpeedDelta;
                        this.dy = -GameConstants.InitSpeedDelta;
                        this.paddle.x = (this.game.screen.width - GameConstants.paddleWidth) / 2;
                    }
                }
            }


            this.ball.x += this.dx;
            this.ball.y += this.dy;
        }       

    }
}