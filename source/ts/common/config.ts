namespace game {
    export class GameConstants {                
        public static brickRowCount: number = 6;
        public static brickColumnCount: number = 4;
        public static brickWidth: number = 80;
        public static brickHeight: number = 20;
        public static brickPadding: number = 10;
        public static brickOffsetTop: number = 30;
        public static brickOffsetLeft: number = 30;
        public static brickColor: number = 0xFF0000;

        public static paddleHeight: number = 12;
        public static paddleWidth: number = 75;
        
        public static ballRadius: number = 10;

        public static MaxLifeCounter: number = 3;
        public static InitSpeedDelta: number = 2; // initial ball speed
        public static PowerUpBallSpeedDelta: number = 2; // 2nd power up ball speed increment value
        public static PowerInitSpeedDelta: number = 4;  // power up falling speed

        public static power1Color: number = 0x00FF00;
        public static power2Color: number = 0xAA00BB;
        public static powerWidth: number = 30;
        public static isWin : boolean = false;
        public static score: number = 0;
        public static lives: number = GameConstants.MaxLifeCounter;
    }
}