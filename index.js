/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const ratioSlider = document.getElementById("ratioSlider");
  const ratioLabel = document.getElementById("ratioLabel");
  canvas.width = 700;
  canvas.height = 900;
  let linesArray = [];
  let numberOfLines = 50;
  let sliderValue;

  class Line {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.breakValue;
      this.history = [{ x: this.x, y: this.y }];
      this.lineWidth = Math.floor(Math.random() * 10 + 1);
      this.hue = Math.floor(Math.random() * 360);
      this.maxLength = Math.floor(Math.random() * 150 + 10);
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = 7;
      this.lifeSpan = this.maxLength * 3;
      this.breakPoint = this.lifeSpan * this.breakValue;
      this.timer = 0;
      this.va = Math.random() * 0.5 - 0.25;
      this.angle = 0;
      this.curve = 30;
      this.vc = Math.random() * 0.4 - 0.2;
    }
    draw(context) {
      context.strokeStyle = "hsl(" + this.hue + ", 100%, 50%)";
      context.lineWidth = this.lineWidth;
      context.beginPath();
      context.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 0; i < this.history.length; i++) {
        context.lineTo(this.history[i].x, this.history[i].y);
      }
      context.stroke();
    }
    update() {
      this.timer++;
      this.angle += this.va;
      this.curve += this.vc;
      if (this.timer < this.lifeSpan) {
        if (this.timer < this.breakPoint) {
          this.va *= -1.12;
        }
        this.x += Math.sin(this.angle) * this.curve;
        this.y += Math.cos(this.angle) * this.curve;
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
    setBreakValue(newBreakValue) {
      this.breakPoint = this.lifeSpan * newBreakValue;
      this.draw(ctx);
      this.update();
    }
    reset() {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.history = [{ x: this.x, y: this.y }];
      this.timer = 0;
      this.angle = 0;
      this.curve = 0;
      this.va = Math.random() * 0.5 - 0.25;
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

  ratioSlider.addEventListener("change", function (e) {
    sliderValue = e.target.value;
    ratioLabel.innerText = `Symmetry : Chaos ${sliderValue}`;
    linesArray.forEach((lineObject) => {
      lineObject.setBreakValue(sliderValue);
    });
  });

  //load function end
});
