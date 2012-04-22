var video  = document.getElementById("input");
var canvas = document.getElementById("output");
var ctx    = canvas.getContext("2d");
var shadow = {
  x: 0,
  y: 0,
  blur: 5,
  spread: 10,
  color: '#000'
}


navigator.webkitGetUserMedia("video",
  function(stream) {
    video.src = window.webkitURL.createObjectURL(stream)
  }, function(err) { alert("Looks like your browser doesn't support using the webcam. Oh well..."); }
);


function draw() {
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
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(comp.x, comp.y, comp.width, comp.height);
  var xoff = 2 * ((comp.x + comp.width / 2) - (canvas.width / 2)) / canvas.width;
  var yoff = -2 * ((comp.y + comp.height / 2) - (canvas.height / 2)) / canvas.height;
  var zoom = (canvas.width * canvas.height / 2) / (comp.width * comp.height);

  mesh.rotation.y   = xoff;
  mesh.rotation.x   = yoff;
  camera.position.z = zoom * 100;

  sinewave.setFrequency(-xoff * 1024 + 1024);
  sinewave.setAmplitude(yoff + 1);
}


video.addEventListener('play', function() { setInterval(draw, 1); });


var camera, scene, renderer, geometry, material, mesh, texture;
init();
animate();

function init() {
  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  scene.add(camera);

  geometry = new THREE.CubeGeometry(200, 200, 200);
  material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  mesh     = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render( scene, camera );
}


var context  = new webkitAudioContext();
var sinewave = new SineWave(context);
sinewave.play();
console.log(sinewave);