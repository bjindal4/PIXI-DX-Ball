namespace game{
    export class Paddle {
        private game: any;
        private paddleX : number;
        private paddle: PIXI.Graphics;

        constructor (app: PIXI.Application) {
            this.game = app;
            this.paddleX = 0;
            this.drawPaddle();
            document.addEventListener("scalePaddle", this.scalePaddle.bind(this), false);
        }

        protected drawPaddle(){
            this.paddle = new PIXI.Graphics();
            this.paddle.beginFill(GameConstants.brickColor);
            this.paddle.drawRect(0, 0, GameConstants.paddleWidth, GameConstants.paddleHeight);
            this.paddle.endFill();    
            this.updatePosition((this.game.screen.width-GameConstants.paddleWidth)/2, this.game.screen.height-GameConstants.paddleHeight);    
            this.paddle.name = "paddle";
            this.game.stage.on('mousemove', this.onMouseMove, this);
        }

        public getPaddle() : PIXI.Graphics {
            return this.paddle;
        }

        public scalePaddle(){
            this.paddle.scale.x = 2;
            GameConstants.paddleWidth = this.paddle.width;
        }

        public updatePosition(x: number, y: number){
            this.paddle.x = x;
            this.paddle.y = y;
        }
        
        protected onMouseMove(e: any) {            
            let relativeX = e.data.originalEvent.clientX - this.game.view.offsetLeft;
            if (relativeX > 0 && relativeX < this.game.screen.width) {
                this.paddle.x = relativeX - GameConstants.paddleWidth / 2;
            }
        }

    }
}