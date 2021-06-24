/// <reference path="./GameView.ts" />

namespace game {
    let isPaused: boolean = false;
    
    const app = new PIXI.Application({
        width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(app.view);

    let view = new GameView(app);
        
    app.stage.interactive = true;
    app.stage.hitArea = app.renderer.screen;
    
    app.ticker.add(function (time) {
        if (!isPaused) {
            app.renderer.render(app.stage);           
            view.updateView();
            PIXI.tweenManager.update(time);
        }
    });
    
    document.addEventListener("showMessage", closeGame, false);    
    document.addEventListener("keydown", onKeyDown);

    function onKeyDown(e: any) {
        if(e.code !== "F11" && e.code !== "F12"){
            isPaused = !isPaused;
            gamePause();
        }
    }

    function closeGame(){
        document.removeEventListener("showMessage", closeGame);   
        document.removeEventListener("keydown", onKeyDown);
        isPaused = true;
        gamePause();
        view.removeListeners();
    }

    function gamePause(){
        if (isPaused) {
            PIXI.Ticker.shared.speed = 0;
            app.renderer.plugins.interaction.destroy();
        } else {
            PIXI.Ticker.shared.speed = 1;
            //@ts-ignore
            app.renderer.plugins.interaction = new PIXI.InteractionManager(app.renderer)
        }
    }  
}

    



