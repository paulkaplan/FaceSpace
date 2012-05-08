#Build
Requires node, npm and Chrome. Only tested on a Mac, should work on any computer with a webcam.

```
git clone git@github.com:sczizzo/Faceit.git
cd Faceit
npm install
node app.js
```

In Chrome, go to chrome://flags, enable MediaStream flag.

##Structure:
```localhost:3000
|- / -> Theremin
|- /map -> Google street view with face controls
|- /pong -> Multiplayer face pong
```

#Troubleshooting / Warning
If you get some permissions errors, try starting Chrome from the terminal with this command:
```
    /path/to/chrome/app --allow-file-access-from-file
```

On a Mac, that path is annoyingly long, for reference on my computer it looks like:
```
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-file
```
Also note: you might want to turn down your speakers, the theremin can catch you by surprise.

#Status
Face pong and theremin where created during the [hack@uchicago](http://hack.uchicago.edu/) hackathon, april 2012. Map was created shortly thereafter.
###Pong
Uses [now.js](http://nowjs.com/) for multiplayer action, currently won't really work without two different people logged in. Even then it's pretty broken. Will get back to working on this soon with deterministic physics approach for auto tweening the ball from paddle to paddle, instead of the velocity based approach.

###Theremin
I want to make a blues scale jazz one. Or one where your up and down head motion is the drum beat and side to side is chord progression.

###Map
Lots to do here, mostly google street view isn't quite fast enough to keep up. Waiting for them to open up MapGL API. But working on a way to advance down the street in the direction you are facing, have a prototype which is alright I'll put up soon. It is like a real life racing game, pretty sweet actually.

###Future
Looking into replacing pure javascript vision library with either Native Client (C/C++) or websocket-ing in the data from a server running client side.

Working sample of websockets + Processing + minecraft in three.js will be up soon.

#Wanna help?
Feel free to contact [Paul](https://www.facebook.com/paulkaplan74 "Paul's Facebook") if any of this looks interesting to you or you want to get involved. There will be much more to come.
