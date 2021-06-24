var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var GameConstants = (function () {
        function GameConstants() {
        }
        GameConstants.brickRowCount = 6;
        GameConstants.brickColumnCount = 4;
        GameConstants.brickWidth = 80;
        GameConstants.brickHeight = 20;
        GameConstants.brickPadding = 10;
        GameConstants.brickOffsetTop = 30;
        GameConstants.brickOffsetLeft = 30;
        GameConstants.brickColor = 0xFF0000;
        GameConstants.paddleHeight = 12;
        GameConstants.paddleWidth = 75;
        GameConstants.ballRadius = 10;
        GameConstants.MaxLifeCounter = 3;
        GameConstants.InitSpeedDelta = 2;
        GameConstants.PowerUpBallSpeedDelta = 2;
        GameConstants.PowerInitSpeedDelta = 4;
        GameConstants.power1Color = 0x00FF00;
        GameConstants.power2Color = 0xAA00BB;
        GameConstants.powerWidth = 30;
        GameConstants.isWin = false;
        GameConstants.score = 0;
        GameConstants.lives = GameConstants.MaxLifeCounter;
        return GameConstants;
    }());
    game.GameConstants = GameConstants;
})(game || (game = {}));
var game;
(function (game) {
    var GameEvents = (function () {
        function GameEvents() {
        }
        GameEvents.COLLISION = new Event("collision");
        GameEvents.SCALE_PADDLE = new Event("scalePaddle");
        GameEvents.UPDATE_LIFE = new Event("updateLife");
        GameEvents.SHOW_MESSAGE = new Event("showMessage");
        GameEvents.POWERUP_MISS = new Event("powerMissed");
        GameEvents.SHOW_POWER = new Event("showPower");
        return GameEvents;
    }());
    game.GameEvents = GameEvents;
})(game || (game = {}));
var game;
(function (game) {
    var PowerUp = (function () {
        function PowerUp(app, name, color) {
            this.game = app;
            this.createPower(name, color);
            this.dx = game.GameConstants.PowerInitSpeedDelta;
            this.dy = game.GameConstants.PowerInitSpeedDelta;
        }
        PowerUp.setPaddle = function (paddle) {
            this.paddle = paddle;
        };
        PowerUp.prototype.createPower = function (name, color) {
            this.power = new PIXI.Graphics();
            this.power.beginFill(color);
            this.power.drawRect(0, 0, game.GameConstants.powerWidth, game.GameConstants.powerWidth);
            this.power.endFill();
            this.power.name = name;
            this.game.stage.addChild(this.power);
            this.setPowerVisible(false);
        };
        PowerUp.prototype.setPosition = function (x, y) {
            this.power.x = x;
            this.power.y = y;
        };
        PowerUp.prototype.setPowerVisible = function (val) {
            this.power.visible = val;
            if (this.power.visible === true) {
                this.addTween();
            }
        };
        PowerUp.prototype.addTween = function () {
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
        };
        PowerUp.prototype.update = function () {
            if (this.power.visible) {
                if (this.power.x + this.dx > this.game.screen.width - this.power.width || this.power.x + this.dx < this.power.width) {
                    this.dx = -this.dx;
                }
                if ((this.power.y + this.dy) >= this.game.screen.height - game.GameConstants.powerWidth) {
                    if ((this.power.y + game.GameConstants.powerWidth) > (this.game.screen.height + 100)) {
                        this.power.visible = false;
                        document.dispatchEvent(game.GameEvents.POWERUP_MISS);
                        return;
                    }
                    else if ((this.power.x + this.dx) >= PowerUp.paddle.x && (this.power.x + this.dx) <= PowerUp.paddle.x + game.GameConstants.paddleWidth) {
                        this.power.visible = false;
                        document.dispatchEvent(game.GameEvents.COLLISION);
                    }
                }
                this.power.x += this.dx;
                this.power.y += this.dy;
            }
        };
        return PowerUp;
    }());
    game.PowerUp = PowerUp;
})(game || (game = {}));
var game;
(function (game) {
    var Paddle = (function () {
        function Paddle(app) {
            this.game = app;
            this.paddleX = 0;
            this.drawPaddle();
            document.addEventListener("scalePaddle", this.scalePaddle.bind(this), false);
        }
        Paddle.prototype.drawPaddle = function () {
            this.paddle = new PIXI.Graphics();
            this.paddle.beginFill(game.GameConstants.brickColor);
            this.paddle.drawRect(0, 0, game.GameConstants.paddleWidth, game.GameConstants.paddleHeight);
            this.paddle.endFill();
            this.updatePosition((this.game.screen.width - game.GameConstants.paddleWidth) / 2, this.game.screen.height - game.GameConstants.paddleHeight);
            this.paddle.name = "paddle";
            this.game.stage.on('mousemove', this.onMouseMove, this);
        };
        Paddle.prototype.getPaddle = function () {
            return this.paddle;
        };
        Paddle.prototype.scalePaddle = function () {
            this.paddle.scale.x = 2;
            game.GameConstants.paddleWidth = this.paddle.width;
        };
        Paddle.prototype.updatePosition = function (x, y) {
            this.paddle.x = x;
            this.paddle.y = y;
        };
        Paddle.prototype.onMouseMove = function (e) {
            var relativeX = e.data.originalEvent.clientX - this.game.view.offsetLeft;
            if (relativeX > 0 && relativeX < this.game.screen.width) {
                this.paddle.x = relativeX - game.GameConstants.paddleWidth / 2;
            }
        };
        return Paddle;
    }());
    game.Paddle = Paddle;
})(game || (game = {}));
var game;
(function (game) {
    var Ball = (function () {
        function Ball(app) {
            this.game = app;
            this.ballX = 0;
            this.ballY = 0;
            this.drawBall();
        }
        Ball.prototype.drawBall = function () {
            this.ball = new PIXI.Graphics();
            this.ball.beginFill(game.GameConstants.brickColor);
            this.ball.drawCircle(this.ballX, this.ballY, game.GameConstants.ballRadius);
            this.ball.endFill();
            this.updatePositions(this.game.screen.width / 2, this.game.screen.height - 30);
            this.ball.name = "ball";
        };
        Ball.prototype.getBall = function () {
            return this.ball;
        };
        Ball.prototype.updatePositions = function (x, y) {
            this.ball.x = x;
            this.ball.y = y;
        };
        return Ball;
    }());
    game.Ball = Ball;
})(game || (game = {}));
var game;
(function (game) {
    var Score = (function (_super) {
        __extends(Score, _super);
        function Score(app) {
            var _this = _super.call(this) || this;
            _this.scoreLabel = new PIXI.Text("Score");
            _this.scoreTxt = new PIXI.Text("0", {
                fontSize: 30,
            });
            _this.scoreTxt.x = 200;
            _this.addChild(_this.scoreLabel);
            _this.addChild(_this.scoreTxt);
            return _this;
        }
        Score.prototype.showScore = function () {
            this.scoreTxt.text = game.GameConstants.score.toString();
        };
        return Score;
    }(PIXI.Container));
    game.Score = Score;
})(game || (game = {}));
var game;
(function (game) {
    var Life = (function (_super) {
        __extends(Life, _super);
        function Life(app) {
            var _this = _super.call(this) || this;
            _this.lifeCounter = game.GameConstants.MaxLifeCounter;
            _this.lifeLabel = new PIXI.Text("Life");
            _this.lifeTxt = new PIXI.Text(_this.lifeCounter.toString(), {
                fontSize: 30,
            });
            _this.lifeTxt.x = 200;
            _this.addChild(_this.lifeLabel);
            _this.addChild(_this.lifeTxt);
            document.addEventListener("updateLife", _this.updateLife.bind(_this), false);
            return _this;
        }
        Life.prototype.updateLife = function () {
            this.showLives(game.GameConstants.lives);
        };
        Life.prototype.showLives = function (val) {
            this.lifeTxt.text = val.toString();
        };
        return Life;
    }(PIXI.Container));
    game.Life = Life;
})(game || (game = {}));
var game;
(function (game) {
    var MessageView = (function (_super) {
        __extends(MessageView, _super);
        function MessageView(app) {
            var _this = _super.call(this) || this;
            _this.game = app;
            _this.createView();
            document.addEventListener("showMessage", _this.updateMessage.bind(_this), false);
            return _this;
        }
        MessageView.prototype.createView = function () {
            this.bg = new PIXI.Graphics();
            this.bg.beginFill(0x000000, 0.5);
            this.bg.drawRect(0, 0, 700, 500);
            this.bg.endFill();
            this.bg.position.set(50, 50);
            this.addChild(this.bg);
            var style = new PIXI.TextStyle({
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
        };
        MessageView.prototype.updateMessage = function () {
            if (game.GameConstants.isWin === true) {
                this.statusTxt.text = "Congratulations! you win.";
            }
            else {
                this.statusTxt.text = "You lose.";
            }
            this.visible = true;
        };
        return MessageView;
    }(PIXI.Container));
    game.MessageView = MessageView;
})(game || (game = {}));
var game;
(function (game) {
    var Brick = (function (_super) {
        __extends(Brick, _super);
        function Brick() {
            var _this = _super.call(this) || this;
            _this.bricks = [];
            for (var c = 0; c < game.GameConstants.brickColumnCount; c++) {
                _this.bricks[c] = [];
                for (var r = 0; r < game.GameConstants.brickRowCount; r++) {
                    _this.bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
            _this.drawBricks();
            _this.name = "brickContainer";
            return _this;
        }
        Brick.prototype.drawBricks = function () {
            for (var c = 0; c < game.GameConstants.brickColumnCount; c++) {
                for (var r = 0; r < game.GameConstants.brickRowCount; r++) {
                    if (this.bricks[c][r].status == 1) {
                        var brickX = (r * (game.GameConstants.brickWidth + game.GameConstants.brickPadding)) + game.GameConstants.brickOffsetLeft;
                        var brickY = (c * (game.GameConstants.brickHeight + game.GameConstants.brickPadding)) + game.GameConstants.brickOffsetTop;
                        this.bricks[c][r].x = brickX;
                        this.bricks[c][r].y = brickY;
                        var rect = new PIXI.Graphics();
                        rect.beginFill(game.GameConstants.brickColor);
                        rect.drawRect(brickX, brickY, game.GameConstants.brickWidth, game.GameConstants.brickHeight);
                        rect.endFill();
                        rect.name = "brick_" + c + "_" + r;
                        this.addChild(rect);
                    }
                }
            }
        };
        Brick.prototype.getBricks = function () {
            return this.bricks;
        };
        return Brick;
    }(PIXI.Container));
    game.Brick = Brick;
})(game || (game = {}));
var game;
(function (game) {
    var GameView = (function () {
        function GameView(app) {
            this.score = 0;
            this.lives = 3;
            this.powerCollisionCount = 0;
            this.powerUpShowCount = 0;
            this.powerUpNumber = Math.floor(Math.random() * 3);
            this.game = app;
            this.brickContainer = new game.Brick();
            app.stage.addChild(this.brickContainer);
            var ballInstance = new game.Ball(app);
            this.ball = ballInstance.getBall();
            app.stage.addChild(this.ball);
            this.power1 = new game.PowerUp(app, "power1", game.GameConstants.power1Color);
            this.power1.setPosition(50, 100);
            this.power2 = new game.PowerUp(app, "power2", game.GameConstants.power2Color);
            this.power2.setPosition(100, 100);
            var paddleInstance = new game.Paddle(app);
            this.paddle = paddleInstance.getPaddle();
            app.stage.addChild(this.paddle);
            game.PowerUp.setPaddle(this.paddle);
            this.scoreView = new game.Score(app);
            app.stage.addChild(this.scoreView);
            this.lifeView = new game.Life(app);
            app.stage.addChild(this.lifeView);
            this.lifeView.position.set(250, 0);
            this.messageView = new game.MessageView(app);
            app.stage.addChild(this.messageView);
            this.dx = game.GameConstants.InitSpeedDelta;
            this.dy = -game.GameConstants.InitSpeedDelta;
            document.addEventListener("collision", this.onCollision.bind(this), false);
            document.addEventListener("powerMissed", this.onPowerMiss.bind(this), false);
            document.addEventListener("showPower", this.showPowerUp.bind(this), false);
        }
        GameView.prototype.removeListeners = function () {
            document.removeEventListener("collision", this.onCollision.bind(this));
            document.removeEventListener("powerMissed", this.onPowerMiss.bind(this));
            document.removeEventListener("showPower", this.showPowerUp.bind(this));
        };
        GameView.prototype.onPowerMiss = function () {
            this.powerCollisionCount++;
        };
        GameView.prototype.onCollision = function () {
            console.log("collision with power");
            this.powerCollisionCount++;
            if (this.powerCollisionCount === 1) {
                document.dispatchEvent(game.GameEvents.SCALE_PADDLE);
            }
            else if (this.powerCollisionCount === 2) {
                this.dx = this.dy = game.GameConstants.InitSpeedDelta = game.GameConstants.PowerUpBallSpeedDelta + game.GameConstants.InitSpeedDelta;
            }
        };
        GameView.prototype.showPowerUp = function () {
            this.powerUpShowCount++;
            if (this.powerUpShowCount === 1) {
                this.power1.setPosition(Math.abs(this.ball.x - 50), Math.abs(this.ball.y - 50));
                this.power1.setPowerVisible(true);
            }
            else if (this.powerUpShowCount === 2) {
                this.power2.setPosition(Math.abs(this.ball.x - 50), Math.abs(this.ball.y - 50));
                this.power2.setPowerVisible(true);
            }
        };
        GameView.prototype.checkHit = function () {
            for (var c = 0; c < game.GameConstants.brickColumnCount; c++) {
                for (var r = 0; r < game.GameConstants.brickRowCount; r++) {
                    var b = this.brickContainer.getBricks()[c][r];
                    if (b.status == 1) {
                        if (this.ball.x > b.x && this.ball.x < b.x + game.GameConstants.brickWidth && this.ball.y > b.y && this.ball.y < b.y + game.GameConstants.brickHeight) {
                            this.dy = -this.dy;
                            b.status = 0;
                            game.GameConstants.score++;
                            this.scoreView.showScore();
                            if (game.GameConstants.score === this.powerUpNumber || game.GameConstants.score === this.powerUpNumber + 5) {
                                document.dispatchEvent(game.GameEvents.SHOW_POWER);
                            }
                            this.brickContainer.getChildByName("brick_" + c + "_" + r).visible = false;
                            if (game.GameConstants.score == game.GameConstants.brickRowCount * game.GameConstants.brickColumnCount) {
                                game.GameConstants.isWin = true;
                                document.dispatchEvent(game.GameEvents.SHOW_MESSAGE);
                            }
                        }
                    }
                }
            }
        };
        GameView.prototype.updateView = function () {
            this.checkHit();
            this.power1.update();
            this.power2.update();
            if (this.ball.x + this.dx > this.game.screen.width - game.GameConstants.ballRadius || this.ball.x + this.dx < game.GameConstants.ballRadius) {
                this.dx = -this.dx;
            }
            if (this.ball.y + this.dy < game.GameConstants.ballRadius) {
                this.dy = -this.dy;
            }
            else if (this.ball.y + this.dy > this.game.screen.height - game.GameConstants.ballRadius) {
                if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + game.GameConstants.paddleWidth) {
                    this.dy = -this.dy;
                }
                else {
                    game.GameConstants.lives--;
                    document.dispatchEvent(game.GameEvents.UPDATE_LIFE);
                    if (!game.GameConstants.lives) {
                        game.GameConstants.isWin = false;
                        document.dispatchEvent(game.GameEvents.SHOW_MESSAGE);
                    }
                    else {
                        this.ball.x = this.game.screen.width / 2;
                        this.ball.y = this.game.screen.height - 30;
                        this.dx = game.GameConstants.InitSpeedDelta;
                        this.dy = -game.GameConstants.InitSpeedDelta;
                        this.paddle.x = (this.game.screen.width - game.GameConstants.paddleWidth) / 2;
                    }
                }
            }
            this.ball.x += this.dx;
            this.ball.y += this.dy;
        };
        return GameView;
    }());
    game.GameView = GameView;
})(game || (game = {}));
var game;
(function (game) {
    var isPaused = false;
    var app = new PIXI.Application({
        width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(app.view);
    var view = new game.GameView(app);
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
    function onKeyDown(e) {
        if (e.code !== "F11" && e.code !== "F12") {
            isPaused = !isPaused;
            gamePause();
        }
    }
    function closeGame() {
        document.removeEventListener("showMessage", closeGame);
        document.removeEventListener("keydown", onKeyDown);
        isPaused = true;
        gamePause();
        view.removeListeners();
    }
    function gamePause() {
        if (isPaused) {
            PIXI.Ticker.shared.speed = 0;
            app.renderer.plugins.interaction.destroy();
        }
        else {
            PIXI.Ticker.shared.speed = 1;
            app.renderer.plugins.interaction = new PIXI.InteractionManager(app.renderer);
        }
    }
})(game || (game = {}));
