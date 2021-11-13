const canvasSketch = require('canvas-sketch');
const { degToRad } = require('canvas-sketch-util/math');
const {random} = require("canvas-sketch-util");

const size = 1080;

const settings = {
  dimensions: [ size, size ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    //context.fillStyle = 'white';
    //context.fillRect(0, 0, width, height)

    context.strokeStyle = "#000"

    const px = width / 600;
    const box = {
      "width": 60 * px,
      "height": 60 * px,
      "gap": 20 * px
    };
    const margin = 100 * px
    const cnt = 5
    let x, y

    for (let row = 0; row < cnt; row++) {
      for (let col = 0; col < cnt; col++) {

        x = margin + (box.width + box.gap) * col;
        y = margin + (box.width + box.gap) * row;


        context.beginPath()

        const progress = ((col + 1) * (row + 1)) / Math.pow(cnt, 2)
        if (random.chance(0.8)) {
          context.lineWidth = 1 * px;
          context.arc(x + box.width/2, y + box.width /2 , box.width / 2, 0, Math.PI * 2)
        } else {
          context.lineWidth = 2 * px + progress * 8 * px

          // const min_rad = 90
          // const max_rad = 360 - min_rad;
          // const arc_rad = min_rad + progress * (max_rad - min_rad);// * range(0.5, 1.5)
          // const arc_offset = 45; //Math.random() * 360
          // const radius_jitter = range(1, 1.5)
          //
          // context.arc(x, y, box.width / 2 * radius_jitter, degToRad(arc_offset - arc_rad / 2), degToRad(arc_offset + arc_rad / 2))
          // context.stroke()
          // context.beginPath()
          context.rect(x, y, box.width, box.height)

        }
        context.stroke()
      }
    }

  };
};

canvasSketch(sketch, settings);