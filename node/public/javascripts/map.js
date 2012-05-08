var video  = document.getElementById("input");
var canvas = document.getElementById("output");
var threeCanvas, threeCtx;
var ctx    = canvas.getContext("2d");
var panorama, panoOptions;

navigator.webkitGetUserMedia("video",
  function(stream) {
    video.src = window.webkitURL.createObjectURL(stream)
  }, function(err) { alert("Looks like your browser doesn't support using the webcam. Oh well..."); }
);


function draw() {
  // ctx.drawImage(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  var comp = ccv.detect_objects({
    "canvas": canvas,
    "cascade": cascade, // Defined in CCV as part of face-detection
    "interval": 5,
    "min_neighbors": 1
  });

  if (comp.length > 0 && comp[0].confidence > 0) { execute(comp[0]); }
}
var faceMapScalingX = 10.0;
var faceMapScalingY = -8.0;
var faceMapScalingZ = 2.0;

function execute(comp) {

  ctx.strokeStyle = 'rgb(255,0,0)'
  ctx.strokeRect(comp.x, comp.y, comp.width, comp.height);
  
  var xoff = 2 * ((comp.x + comp.width / 2) - (canvas.width / 2)) / canvas.width;
  var yoff = -2 * ((comp.y + comp.height / 2) - (canvas.height / 2)) / canvas.height;
  var scale = (comp.width-35)/20.0;
  
  var currPov = panorama.getPov()
  
  panorama.setPov({
    'heading': currPov.heading + xoff*faceMapScalingX,
    'pitch'  : currPov.pitch   + yoff*faceMapScalingY,
    'zoom'   :currPov.zoom 
  })
}


video.addEventListener('play', function() { setInterval(draw, 1); });

$(document).ready( function() {
  var location = new google.maps.LatLng(37.820616,-122.478354);

  // Note: constructed panorama objects have visible: true
  // set by default.
  panoOptions = {
    position: location,
    addressControlOptions: {
      position: google.maps.ControlPosition.BOTTOM
    },
    linksControl: false,
    panControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    enableCloseButton: false
  };

  panorama = new google.maps.StreetViewPanorama(
  document.getElementById("pano"), panoOptions);
});