# PIXI-DX-Ball

PIXI DX ball game assignment

This game contains bricks, ball, laddle. There is a config file which contains the configurations, 
number of bricks / speed of ball/ laddle width and height etc all can be configured from there. 

Game can be paused by pressing any key of keyboard except f11, f12

Paddle moves around the bottom of the screen as the mouse moves.

There are 2 power ups which come randomly. first power up if hits the laddle, then it increases the size of the laddle.
Second power up, if hits laddle, will increase the ball speed.

All views are drawn by using graphics and can be customised when there are assets present.

The game continues until the lives are exhausted, i.e 3 lives are given, which decrements when the ball misses the laddle.

Once the game is over i.e either lives are exhausted or all bricks are removed, then a message is shown 
and the game is finished.

Setup:

To install dependencies:

npm i

To build the code:

grunt debug

To run the build:

host the build folder using any local server like http-server / wamp/ IIS etc
 using http-server:

 in build folder use following command:
 hs // this will host the build on localhost:8080

 or

 hs -p 8084 // this will host the build on localhost:8084




