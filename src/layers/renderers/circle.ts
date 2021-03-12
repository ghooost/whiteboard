import { IDrawLayerCircle, IDrawPoint } from "../../store/draw/draw.types"

const Circle = {
  postUpdateCurrent(layer: IDrawLayerCircle, ctx: CanvasRenderingContext2D) {
    const {x, y, w, h} = layer.bounds[1];
    ctx.clearRect(x, y, w, h);
    this.render(layer, ctx);
    return 0;
  },

  render(layer: IDrawLayerCircle, ctx: CanvasRenderingContext2D) {
    if (!layer || !layer.base || !layer.radius) {
      return;
    }
    const { x: baseX, y: baseY } = layer.base;
    ctx.beginPath();
    ctx.lineWidth = layer.lineWidth;
    ctx.strokeStyle = layer.strokeStyle;
    ctx.arc(baseX, baseY, layer.radius, 0, Math.PI * 2);
    ctx.stroke();
  },

  change(layer: IDrawLayerCircle, point: IDrawPoint) {
    if (!layer) {
      return;
    }
    const { x: baseX, y: baseY } = layer.base;
    const { x, y } = point;
    const r = Math.round(Math.sqrt(Math.pow(x - baseX, 2) + Math.pow(y - baseY, 2)));
    layer.radius = r;
    const rw = r + layer.lineWidth;
    layer.bounds = [{ x: baseX - rw, y: baseY - rw, w: rw + rw, h: rw + rw }, layer.bounds[0]];
  },

  create(
    id: string,
    point: IDrawPoint,
    lineWidth: number,
    strokeStyle: string,
    fillStyle: string,
  ) {
    const { x, y } = point;
    const layer: IDrawLayerCircle = {
      id,
      type: 'circle',
      radius: 0,
      base: { x, y },
      bounds: [{ x, y, w: 0, h: 0 }, { x, y, w: 0, h: 0 }],
      lineWidth,
      strokeStyle,
      fillStyle,
    };
    return layer;
  },
}

export default Circle;