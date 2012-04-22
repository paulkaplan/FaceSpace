var selfID = Math.random()*1000000;
var video  = document.getElementById("input");
var canvas = document.getElementById("output");
var threeCanvas, threeCtx;
var ctx    = canvas.getContext("2d");
var radius = 20;
var direction = 0;
var inZone = false;
var timeStep = 0.7;
var shadow = {
  x: 0,
  y: 0,
  blur: 5,
  spread: 10,
  color: '#000'
}
$(document).ready(function(){
  now.receiveMessage = function(message){
    if(message.id != selfID){
      mesh.velocity.z = message.vZ; 
      mesh.velocity.y = message.vY;
      mesh.velocity.x = message.vX;
      mesh.position.x = message.bX;
      mesh.position.y = message.bY;
      mesh.position.z = 0;
    } else { console.log(message) }
  }
});

navigator.webkitGetUserMedia("video",
  function(stream) {
    video.src = window.webkitURL.createObjectURL(stream)
    animate();
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


function boxShadow() {
  return shadow.x.toString() + 'px ' + shadow.y.toString() + 'px ' + shadow.blur.toString() + 'px ' + shadow.spread.toString() + 'px ' + shadow.color;
}


function execute(comp) {
  var bx = mesh.position.x + threeCanvas.width/2,
      by = threeCanvas.height/2 - mesh.position.y,
      bz = mesh.position.z;
      
      // console.log(bx,by)
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(comp.x, comp.y, comp.width, comp.height);
  
  var xoff = 2 * ((comp.x + comp.width / 2) - (canvas.width / 2)) / canvas.width;
  var yoff = -2 * ((comp.y + comp.height / 2) - (canvas.height / 2)) / canvas.height;

  var paddleScale = threeCanvas.width / canvas.width;
  var paddleWidth = comp.width * paddleScale;
  var nx = -xoff * 1.42 * threeCanvas.width / 2 + threeCanvas.width / 4;
  var ny = -yoff * 1.42 * threeCanvas.height / 2 + threeCanvas.height / 4;

  inZone = false
  if( bx > nx && bx < nx+paddleWidth
    && by > ny && by < ny+paddleWidth){
        inZone = true;
  }
  
  threeCtx.fillStyle = 'rgb(0,0,0)'
  threeCtx.fillRect(0, 0, threeCanvas.width, threeCanvas.height);
  threeCtx.strokeStyle = 'rgb(255,0,0)'
  threeCtx.strokeRect(nx, ny, paddleWidth, paddleWidth);
}


video.addEventListener('play', function() { setInterval(draw, 1); });


var camera, scene, renderer, geometry, material, mesh;
init();

function init() {
  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  scene.add(camera);

  geometry = new THREE.SphereGeometry(radius, 20, 20);
  material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  mesh     = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  mesh.velocity = new THREE.Vertex();
  mesh.velocity.z = 50
  mesh.velocity.y = 5
  mesh.velocity.x = 1
  
  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
  document.body.appendChild(renderer.domElement);
  threeCanvas = renderer.domElement;
  threeCtx    = threeCanvas.getContext("2d");
  
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function updateBallVelocity(){
  if( mesh.velocity.z > 0
    && mesh.position.z >= camera.position.z-201
    && inZone ){
        mesh.velocity.z *= -1;
        mesh.velocity.x *= -1*Math.random();
        mesh.velocity.y *= -1*Math.random();
        now.distributeMessage({
          id : selfID,
          vZ : -mesh.velocity.z, 
          vY : mesh.velocity.y,
          vX : mesh.velocity.x,
          bX : mesh.position.x,
          bY : mesh.position.y,
          bZ : mesh.position.z
        })
  }
}

function render() {
  updateBallVelocity()
  mesh.position.z += mesh.velocity.z*timeStep;
  mesh.position.x += mesh.velocity.x*timeStep;
  mesh.position.y += mesh.velocity.y*timeStep;
  
  renderer.render( scene, camera );
}
