/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 700;
  canvas.height = 900;

  const radialBtn = this.document.getElementById("radialBtn");
  const linearBtn = this.document.getElementById("linearBtn");

  const linesArray = [];
  const numberOfLines = 200;

  //canvas shadows
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowColor = "white";

  const linearGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.width);
  linearGrad.addColorStop("0.2", "pink");
  linearGrad.addColorStop("0.3", "red");
  linearGrad.addColorStop("0.4", "orange");
  linearGrad.addColorStop("0.5", "yellow");
  linearGrad.addColorStop("0.6", "green");
  linearGrad.addColorStop("0.7", "turquoise");
  linearGrad.addColorStop("0.8", "violet");

  const RadialGrad = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.width * 0.5,
    10,
    canvas.width * 0.5,
    canvas.width * 0.5,
    500
  );
  RadialGrad.addColorStop("0.2", "pink");
  RadialGrad.addColorStop("0.3", "red");
  RadialGrad.addColorStop("0.4", "orange");
  RadialGrad.addColorStop("0.5", "yellow");
  RadialGrad.addColorStop("0.6", "green");
  RadialGrad.addColorStop("0.7", "turquoise");
  RadialGrad.addColorStop("0.8", "violet");
  ctx.strokeStyle = "hsl(230, 100%, 50%)";
  class Line {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.history = [{ x: this.x, y: this.y }];
      this.lineWidth = Math.floor(Math.random() * 10 + 1);
      //this.lineWidth = 50;
      this.hue = Math.floor(Math.random() * 360);
      this.maxLength = Math.floor(Math.random() * 150 + 10);
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = 7;
      this.lifeSpan = this.maxLength * 3;
      this.timer = 0;
    }
    draw(context) {
      //context.strokeStyle = "hsl(" + this.hue + ", 100%, 50%)";
      context.lineWidth = this.lineWidth;
      context.beginPath();
      context.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 0; i < this.history.length; i++) {
        context.lineTo(this.history[i].x, this.history[i].y);
      }
      context.stroke();
    }
    setGrad(newGrad) {
      ctx.strokeStyle = newGrad;
    }
    update() {
      this.timer++;
      if (this.timer < this.lifeSpan) {
        this.x += this.speedX + Math.random() * 20 - 10;
        this.y += this.speedY + Math.random() * 20 - 10;
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxLength) {
          this.history.shift();
        }
      } else if (this.history.length <= 1) {
        this.reset();
      } else {
        this.history.shift();
      }
    }
    reset() {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.history = [{ x: this.x, y: this.y }];
      this.timer = 0;
    }
  }
  for (let i = 0; i < numberOfLines; i++) {
    linesArray.push(new Line(canvas));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    linesArray.forEach((lineObject) => {
      lineObject.draw(ctx);
      lineObject.update();
    });

    requestAnimationFrame(animate);
  }
  animate();

  linearBtn.addEventListener("click", function (e) {
    e.preventDefault();
    linesArray.forEach((lineObject) => {
      lineObject.setGrad(linearGrad);
    });
  });

  radialBtn.addEventListener("click", function (e) {
    e.preventDefault();
    linesArray.forEach((lineObject) => {
      lineObject.setGrad(RadialGrad);
    });
  });

  //load function end
});
