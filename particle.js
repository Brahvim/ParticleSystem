// Particle System Simulation
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/syR0klfncCk
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html
// https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.vel = (Math.round(random(0, 1)) == 1) ?
      p5.Vector.random2D() : p5.Vector.random2D();
    this.vel.setMag(random(0.5, random(2, 5)));
    this.acc = createVector(0, 0);
    this.r = 4; this.d = this.r * 2;
    this.oval = random(this.d - (this.d / 5), this.d);
    this.red = Math.round(random(0, 255));
    this.green = Math.round(random(0, 255));
    this.blue = Math.round(random(0, 255));
    this.alpha = 255;
    this.lifetime = 255;
  }

  finished() {
    return this.lifetime < 1;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.edges();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.lifetime -= 5;
    if (frameCount % 15 == 0) this.alpha = this.lifetime;
  }

  show() {
    stroke(this.red, this.green, this.blue, this.alpha);
    strokeWeight(1);
    fill(this.red, this.green, this.blue, this.lifetime, this.alpha);
    ellipse(this.pos.x, this.pos.y, this.oval, this.oval);
  }
}
