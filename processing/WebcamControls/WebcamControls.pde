import hypermedia.video.*;          //  Imports the OpenCV library
import java.awt.Rectangle;  //A rectangle class which keeps track of the face coordinates.
import muthesius.net.*;
import org.webbitserver.*;

WebSocketP5 socket;

OpenCV opencv;                      //  Creates a new OpenCV object
PImage movementImg;                 //  Creates a new PImage to hold the movement image
int poppedBubbles;                  //  Creates a variable to hold the total number of popped bubbles
ArrayList bubbles;                  //  Creates an ArrayList to hold the Bubble objects
PImage bubblePNG;                   //  Creates a PImage that will hold the image of the bubble
PFont font;                         //  Creates a new font object
int contrast_value    = 0;
int brightness_value  = 0;
Rectangle[] faces;
void setup()
{
  socket = new WebSocketP5(this,8080);

  size ( 320, 240 );       //  Window size of 640 x 480
  opencv = new OpenCV( this );            //  Initialises the OpenCV library
  opencv.capture( 320, 240 );             //  Sets the capture size to 640 x 480
  opencv.cascade( OpenCV.CASCADE_FRONTALFACE_ALT );
//  movementImg = new PImage( 320, 240 );   //  Initialises the PImage that holds the movement image
  poppedBubbles = 0;                     
  
  
  font = loadFont("Serif-48.vlw");        //  Load the font file into memory
  textFont(font, 32);                       

}
void stop() {
socket.stop();
}
void draw()
{
  if(frameCount % 3 == 0) {  
  opencv.read();                              //  Captures a frame from the camera    
  opencv.flip(OpenCV.FLIP_HORIZONTAL);        //  Flips the image horizontally
  image( opencv.image(), 0, 0 );              //  Draws the camera image to the screen
  opencv.convert( GRAY );
  opencv.contrast( contrast_value );
  opencv.brightness( brightness_value );
  faces = opencv.detect( 1.2, 2, OpenCV.HAAR_DO_CANNY_PRUNING, 40, 40 );
  noFill();
  stroke(255,0,0);
  for( int i=0; i<faces.length; i++ ) {
    rect( faces[i].x, faces[i].y, faces[i].width, faces[i].height );
    socket.broadcast( Arrays.toString( 
          new float[] {(float)(faces[i].x+faces[i].width/2)/(320.0), 
                       (float)(faces[i].y+faces[i].height/2)/(240.0), 
                       (float)faces[i].width/320.0, 
                       (float)faces[i].height/240.0})  
//                                      .replace("", "")  //remove the commas
                                      .replace("[", "")
                                      .replace("]", "")
    );

  }
//  opencv.absDiff();                           //  Creates a difference image
//    
//  opencv.convert(OpenCV.GRAY);                //  Converts to greyscale
//  opencv.blur(OpenCV.BLUR, 3);                //  Blur to remove camera noise
//  opencv.threshold(20);                       //  Thresholds to convert to black and white
//  movementImg = opencv.image();               //  Puts the OpenCV buffer into an image object
//  opencv.remember(OpenCV.SOURCE, OpenCV.FLIP_HORIZONTAL);    //  Remembers the camera image so we can generate a difference image next frame. Since we've
//                                                             //  flipped the image earlier, we need to flip it here too.
//  text("Bubbles popped: " + poppedBubbles, 20, 40);          //  Displays some text showing how many bubbles have been popped
//  image( movementImg,100,100);
}
}

void websocketOnMessage(WebSocketConnection con, String msg){
	println(msg);
}

void websocketOnOpen(WebSocketConnection con){
  println("A client joined");
}

void websocketOnClosed(WebSocketConnection con){
  println("A client left");
}

