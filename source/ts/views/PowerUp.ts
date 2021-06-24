namespace game {
    export class PowerUp {
        private game: PIXI.Application;
        private power: PIXI.Graphics;
        private dx: number;
        private dy: number;
        static paddle: PIXI.Graphics;
        private tween2: any;

        constructor(app: PIXI.Application, name: string, color: number) {
            this.game = app;            
            this.createPower(name, color);
            this.dx = GameConstants.PowerInitSpeedDelta;
            this.dy = GameConstants.PowerInitSpeedDelta;
        }

        static setPaddle(paddle:PIXI.Graphics){
            this.paddle = paddle;
        }

        private createPower(name: string, color: number) {
            this.power = new PIXI.Graphics();
            this.power.beginFill(color);
            this.power.drawRect(0, 0, GameConstants.powerWidth, GameConstants.powerWidth);
            this.power.endFill();
            this.power.name = name;
            this.game.stage.addChild(this.power);
            this.setPowerVisible(false);
        }

        public setPosition(x: number, y: number) {
            this.power.x = x;
            this.power.y = y;
        }

        public setPowerVisible(val: boolean) {
            this.power.visible = val;
            if(this.power.visible === true){
                this.addTween();
            }
        }

        private addTween(){
            this.tween2 = PIXI.tweenManager.createTween(this.power);
            this.tween2.from({
                rotation: 0
               
            });
            this.tween2.to({
                rotation: PIXI.DEG_TO_RAD * 359                
            });
            this.tween2.loop = true;
            this.tween2.pingPong = true;
            this.tween2.time = 3000;
            this.tween2.start();
        }
        
        public update() {
            if (this.power.visible) {              
                if (this.power.x + this.dx > this.game.screen.width - this.power.width || this.power.x + this.dx < this.power.width) {
                    this.dx = -this.dx;
                }
               
                if ((this.power.y + this.dy) >= this.game.screen.height - GameConstants.powerWidth) {
                    if((this.power.y + GameConstants.powerWidth) > (this.game.screen.height+100)) {
                        this.power.visible = false;
                        document.dispatchEvent(GameEvents.POWERUP_MISS);
                        return;                     
                    } else if ((this.power.x + this.dx) >= PowerUp.paddle.x && (this.power.x + this.dx) <= PowerUp.paddle.x + GameConstants.paddleWidth) {
                        this.power.visible = false;
                       document.dispatchEvent(GameEvents.COLLISION);                        
                    }
                 
                }
                this.power.x += this.dx;
                this.power.y += this.dy;               
            }
        }
    }
}