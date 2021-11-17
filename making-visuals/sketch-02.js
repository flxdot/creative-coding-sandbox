const canvasSketch = require('canvas-sketch');
const {degToRad} = require("canvas-sketch-util/math");
const {range} = require("canvas-sketch-util/random")

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#000'
    context.strokeStyle = '#000'

    const px = width / 600;
    const radius = width / 3 * 2;
    const cw = 5 * px;
    const ch = 30 * px;
    const segmentCnt = 64;
    const segment = 360 / segmentCnt;

    for (let i = 0; i < segmentCnt; i++) {
      context.save()
      context.translate(width, height);
      context.rotate(degToRad(segment * i))
      context.beginPath()
      context.rect(-cw/2, radius-ch/2, range(cw*0.5, cw*2), ch);
      context.fill()

      const arcWidth = degToRad(range(0.25 * segment, 0.9 * segment))
      context.beginPath()
      context.lineWidth = range(5, 15) * px;
      context.arc(0, 0, radius * range(2/3, 4/3), range(0.5, 20) * -arcWidth, range(0.3, 10) * arcWidth)
      context.stroke()
      context.restore()
    }
  };
};

canvasSketch(sketch, settings);
