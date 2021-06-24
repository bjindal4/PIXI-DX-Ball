namespace game{
    export class GameEvents{
        public static COLLISION = new Event("collision");
        public static SCALE_PADDLE = new Event("scalePaddle");
        public static UPDATE_LIFE = new Event ("updateLife");
        public static SHOW_MESSAGE = new Event ("showMessage"); 
        public static POWERUP_MISS  = new Event ("powerMissed");
        public static SHOW_POWER = new Event ("showPower");
    }
}