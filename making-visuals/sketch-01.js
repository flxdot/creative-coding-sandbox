const canvasSketch = require("canvas-sketch");
const { degToRad, lerp } = require("canvas-sketch-util/math");
const { random } = require("canvas-sketch-util");

const size = 1080;

const settings = {
  dimensions: [size, size],
  pixelsPerInch: 300,
};

const sketch = () => {
  return ({ context, width, height }) => {

    const px = width / 600;
    const margin = 100 * px;

    var gradient = context.createLinearGradient(0,0, width, height)
    gradient.addColorStop(0, "grey")
    gradient.addColorStop(1, "black")
    context.fillStyle = gradient;
    context.fillRect(margin/2, margin/2, width - margin, height-margin)

    context.strokeStyle = '#fff'
    const box = {
      width: 60 * px,
      height: 60 * px,
      gap: 20 * px,
    };
    const cnt = 5;
    let x, y, progress;

    const setLineWidth = (progress) => {
      if (random.chance(0.8)) {
          context.lineWidth = 1 * px;
        } else {
          context.lineWidth = 4 * px + progress * 4 * px;
        }
    }

    const drawRect = (x, y) => {
      // const min_rad = 90;
      // const max_rad = 360 - min_rad;
      // const arc_rad = min_rad + progress * (max_rad - min_rad); // * range(0.5, 1.5)
      // const arc_offset = 45; //Math.random() * 360
      // const radius_jitter = random.range(0.5, 1.5);
      //
      // context.beginPath();
      // context.arc(
      //   x,
      //   y,
      //   (box.width / 2) * radius_jitter,
      //   degToRad(0),
      //   degToRad(360)
      // );
      // context.stroke();
      context.beginPath();
      context.rect(x, y, box.width, box.height);
      context.stroke();
    };

    const drawCirc = (c) => {
      context.beginPath();
      context.arc(
        x + box.width / 2,
        y + box.width / 2,
        box.width / 2,
        0,
        Math.PI * 2
      );
      context.stroke();
    };

    const drawTria = (x, y) => {
      context.beginPath();
      context.moveTo(x + box.width / 2, y)
      context.lineTo(x + box.width, y + box.height)
      context.lineTo(x, y + box.height)
      context.lineTo(x + box.width / 2, y)
      context.closePath()
      context.stroke()
    }

    function drawContent() {
      for (let row = 0; row < cnt; row++) {
        for (let col = 0; col < cnt; col++) {
          x = margin + (box.width + box.gap) * col;
          y = margin + (box.width + box.gap) * row;
          progress = ((col + 1) * (row + 1)) / Math.pow(cnt, 2);

          setLineWidth(progress)
          context.strokeStyle = `rgb(${Math.floor(255 - 42.5 * row)}, ${Math.floor(255 - 42.5 * col)}, ${Math.floor(255 - 42.5 * col)})`;

          const choice = Math.random()
          if (choice < 0.8) {
            drawCirc(x, y);
          } else if (choice < 0.9) {
            drawRect(x, y);
          } else {
            drawTria(x, y)
          }
        }
      }
    }

    drawContent();
    drawContent();
  };
};

canvasSketch(sketch, settings);
