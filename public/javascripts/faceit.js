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


function isNear(x, y) {
  if (Math.abs(x-y) < 10.0) { return true; }
  return false;
}


function execute(comp) {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(comp.x, comp.y, comp.width, comp.height);
  var xoff =  2 * ((comp.x + comp.width / 2) - (canvas.width / 2)) / canvas.width;
  var yoff = -2 * ((comp.y + comp.height / 2) - (canvas.height / 2)) / canvas.height;
  var zoom = (canvas.width * canvas.height / 2) / (comp.width * comp.height);

  mesh.rotation.y   = xoff;
  mesh.rotation.x   = yoff;
  camera.position.z = zoom * 100;

  var setFreq = false;
  var freq = -xoff * 1.42 * 1024 + 1024;

  var C0 = 16.35;
  var C1 = 32.70;
  var C2 = 65.41;
  var C3 = 130.81;
  var C4 = 261.63;
  var C5 = 523.25;
  var C6 = 1046.50;

  var D0 = 18.35;
  var D1 = 36.71;
  var D2 = 73.42;
  var D3 = 146.83;
  var D4 = 293.66;
  var D5 = 587.33;
  var D6 = 1174.66;

  var G0 = 24.50;
  var G1 = 49.00;
  var G2 = 98.00;
  var G3 = 196.00;
  var G4 = 392.00;
  var G5 = 783.99;
  var G6 = 1567.98;

  var A0 = 27.50;
  var A1 = 55.00;
  var A2 = 110.00;
  var A3 = 220.00;
  var A4 = 440.00;
  var A5 = 880.00;
  var A6 = 1760.00;

  var E0 = 20.60;
  var E1 = 41.20;
  var E2 = 82.41;
  var E3 = 164.81;
  var E4 = 329.63;
  var E5 = 659.26;
  var E6 = 1318.51;

  var F0 = 21.83;
  var F1 = 43.65;
  var F2 = 87.31;
  var F3 = 174.61;
  var F4 = 349.23;
  var F5 = 698.46;
  var F6 = 1396.91;

  if (isNear(freq, C0)) { freq = C0; setFreq = true; }
  if (isNear(freq, C1)) { freq = C1; setFreq = true; }
  if (isNear(freq, C2)) { freq = C2; setFreq = true; }
  if (isNear(freq, C3)) { freq = C3; setFreq = true; }
  if (isNear(freq, C4)) { freq = C4; setFreq = true; }
  if (isNear(freq, C5)) { freq = C5; setFreq = true; }
  if (isNear(freq, C6)) { freq = C6; setFreq = true; }

  if (isNear(freq, D0)) { freq = D0; setFreq = true; }
  if (isNear(freq, D1)) { freq = D1; setFreq = true; }
  if (isNear(freq, D2)) { freq = D2; setFreq = true; }
  if (isNear(freq, D3)) { freq = D3; setFreq = true; }
  if (isNear(freq, D4)) { freq = D4; setFreq = true; }
  if (isNear(freq, D5)) { freq = D5; setFreq = true; }
  if (isNear(freq, D6)) { freq = D6; setFreq = true; }

  if (isNear(freq, G0)) { freq = G0; setFreq = true; }
  if (isNear(freq, G1)) { freq = G1; setFreq = true; }
  if (isNear(freq, G2)) { freq = G2; setFreq = true; }
  if (isNear(freq, G3)) { freq = G3; setFreq = true; }
  if (isNear(freq, G4)) { freq = G4; setFreq = true; }
  if (isNear(freq, G5)) { freq = G5; setFreq = true; }
  if (isNear(freq, G6)) { freq = G6; setFreq = true; }

  if (isNear(freq, A0)) { freq = A0; setFreq = true; }
  if (isNear(freq, A1)) { freq = A1; setFreq = true; }
  if (isNear(freq, A2)) { freq = A2; setFreq = true; }
  if (isNear(freq, A3)) { freq = A3; setFreq = true; }
  if (isNear(freq, A4)) { freq = A4; setFreq = true; }
  if (isNear(freq, A5)) { freq = A5; setFreq = true; }
  if (isNear(freq, A6)) { freq = A6; setFreq = true; }

  if (isNear(freq, E0)) { freq = E0; setFreq = true; }
  if (isNear(freq, E1)) { freq = E1; setFreq = true; }
  if (isNear(freq, E2)) { freq = E2; setFreq = true; }
  if (isNear(freq, E3)) { freq = E3; setFreq = true; }
  if (isNear(freq, E4)) { freq = E4; setFreq = true; }
  if (isNear(freq, E5)) { freq = E5; setFreq = true; }
  if (isNear(freq, E6)) { freq = E6; setFreq = true; }

  if (isNear(freq, F0)) { freq = F0; setFreq = true; }
  if (isNear(freq, F1)) { freq = F1; setFreq = true; }
  if (isNear(freq, F2)) { freq = F2; setFreq = true; }
  if (isNear(freq, F3)) { freq = F3; setFreq = true; }
  if (isNear(freq, F4)) { freq = F4; setFreq = true; }
  if (isNear(freq, F5)) { freq = F5; setFreq = true; }
  if (isNear(freq, F6)) { freq = F6; setFreq = true; }

  if (setFreq) { sinewave.setFrequency(freq); }
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
// sinewave.play();
