namespace game{
    export class MessageView extends PIXI.Container{
        private game: PIXI.Application;
        private bg: PIXI.Graphics;
        private statusTxt: PIXI.Text;

        constructor(app: PIXI.Application){
            super();
            this.game = app;
            this.createView();
            document.addEventListener("showMessage", this.updateMessage.bind(this), false);
        }

        private createView(){
            this.bg = new PIXI.Graphics();
            this.bg.beginFill(0x000000, 0.5);
            this.bg.drawRect(0, 0, 700, 500);
            this.bg.endFill();    
            this.bg.position.set(50, 50);
            this.addChild(this.bg);

            const style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 36,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffffff', '#00ff99'], 
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440,
                lineJoin: 'round',
            });
            
            this.statusTxt = new PIXI.Text('', style);
            this.statusTxt.x = 150;
            this.statusTxt.y = 220;
            this.addChild(this.statusTxt);
            this.name = "messageView";
            this.visible = false;
        }

        private updateMessage(){
            if(GameConstants.isWin === true){
                this.statusTxt.text = "Congratulations! you win."
            } else{
                this.statusTxt.text = "You lose."
            }
            this.visible = true;
        }
    }
}