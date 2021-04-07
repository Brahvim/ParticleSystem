// Particle System Simulation: MODIFIED!
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/syR0klfncCk
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html
// https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ

var particles = [], fps = 0, emit = false, avgFPS = 0, fpsData = [];
function setup() {
  frameRate(60);
  createCanvas(window.innerWidth - window.innerWidth / 16, window.innerHeight - window.innerHeight / 9);
}

function draw() {
  background(0);

  push();
  fill(255); strokeWeight(0);
  if (frameCount % 15 == 0)
    fps = Math.round(frameRate());

  textAlign(CENTER);
  text("FPS: " + fps, 50, 50);
  text("Average FPS in\n the last 15 frames:\n" + avgFPS, 60, 80);
  pop();

  fpsData.push(Math.round(frameRate()));

  if (frameCount % 30 == 0) {
    fpsData.splice(0, 15); avgFPS = 0;
  }

  if (frameCount % 15 == 0) {
    for (let j = 0; j < fpsData.length; j++) {
      avgFPS += fpsData[j];
    }
    avgFPS /= fpsData.length;
  }



  if (emit) {
    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(mouseX, mouseY));
    }
  }

  for (let particle of particles) {
    let gravity = createVector(0, 0.2);
    particle.applyForce(gravity);
    particle.update();
    particle.show();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}


function mousePressed() {
  emit = !emit;
}
