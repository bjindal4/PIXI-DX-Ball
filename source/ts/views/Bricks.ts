namespace game {
  export class Brick extends PIXI.Container {
    private bricks: any =[];

    constructor() {
      super();     
      for (let c = 0; c < GameConstants.brickColumnCount; c++) {
        this.bricks[c] = [];
        for (var r = 0; r < GameConstants.brickRowCount; r++) {
          this.bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
      }
      this.drawBricks();
      this.name = "brickContainer";
    }

    protected drawBricks() {      
      for (let c: number = 0; c < GameConstants.brickColumnCount; c++) {
        for (let r: number = 0; r < GameConstants.brickRowCount; r++) {
          if (this.bricks[c][r].status == 1) {
            let brickX = (r * (GameConstants.brickWidth + GameConstants.brickPadding)) + GameConstants.brickOffsetLeft;
            let brickY = (c * (GameConstants.brickHeight + GameConstants.brickPadding)) + GameConstants.brickOffsetTop;
            this.bricks[c][r].x = brickX;
            this.bricks[c][r].y = brickY;
            let rect = new PIXI.Graphics();
            rect.beginFill(GameConstants.brickColor);
            rect.drawRect(brickX, brickY, GameConstants.brickWidth, GameConstants.brickHeight);
            rect.endFill();
            rect.name = "brick_"+c+"_"+r;
            this.addChild(rect);
          }
        }
      }
    }

    public getBricks(){
      return this.bricks;
    }
  }
}