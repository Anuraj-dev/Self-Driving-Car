/**
 * Tells VS Code that 'ctx' is a 2D Canvas Rendering Context.
 * @param {CanvasRenderingContext2D} ctx
 */

class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.accelaration = 0.2;
    this.maxSpeed = 4;
    this.friction = 0.05;
    this.angle = 0;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }

  update() {
    this.#move();
    this.sensor.update();
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.accelaration;
    }
    if (this.controls.reverse) {
      this.speed -= this.accelaration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;

      if (this.controls.left) {
        this.angle += 0.03 * flip; //* Unit circle is rotated 90deg because our 0 is in the top
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip; //* Works according to the unit circle
      }
    }

    this.x -= Math.sin(this.angle) * this.speed; //? What does this actually do?
    this.y -= Math.cos(this.angle) * this.speed;

    // this.y -= this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore(); //? Why we need restore??

    this.sensor.draw(ctx);
  }
}
