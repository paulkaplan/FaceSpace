var panorama, panoOptions;


function draw() {}
var faceMapScalingX = 10.0;
var faceMapScalingY = -8.0;
var faceMapScalingZ = 2.0;

function execute(comp) {
      
      // console.log(bx,by)
  var xoff = 2 * ((comp.x + comp.width / 2) - (canvas.width / 2)) / canvas.width;
  var yoff = -2 * ((comp.y + comp.height / 2) - (canvas.height / 2)) / canvas.height;
  var scale = (comp.width-35)/20.0;
  // console.log((comp.width-35)/20.0)
  
  var currPov = panorama.getPov()
  
  panorama.setPov({
    'heading': currPov.heading + xoff*faceMapScalingX,
    'pitch'  : currPov.pitch   + yoff*faceMapScalingY,
    'zoom'   :currPov.zoom 
  })
  // console.log(xoff, yoff)
  // var paddleScale = threeCanvas.width / canvas.width;
  // var paddleWidth = comp.width * paddleScale;
  // var nx = -xoff * 1.42 * threeCanvas.width / 2 + threeCanvas.width / 4;
  // var ny = -yoff * 1.42 * threeCanvas.height / 2 + threeCanvas.height / 4;
}

$(document).ready( function() {

});