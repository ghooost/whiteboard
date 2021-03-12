import { IDrawLayerRect, IDrawPoint } from "../../store/draw/draw.types"

const Rect = {
  postUpdateCurrent(layer: IDrawLayerRect, ctx: CanvasRenderingContext2D) {
    const { x, y, w, h } = layer.bounds[1];
    ctx.clearRect(x, y, w, h);
    this.render(layer, ctx);
    return 0;
  },

  render (layer: IDrawLayerRect, ctx: CanvasRenderingContext2D) {
    if (!layer || !layer.w || !layer.h) {
      return;
    }
    const { x, y, w, h } = layer;
    ctx.beginPath();
    ctx.lineWidth = layer.lineWidth;
    ctx.strokeStyle = layer.strokeStyle;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  },

  change (layer: IDrawLayerRect, point: IDrawPoint) {
    if (!layer) {
      return;
    }
    const { x: baseX, y: baseY } = layer;
    const { x, y } = point;
    const left = Math.min(x, baseX);
    const top = Math.min(y, baseY);
    const width = Math.max(x, baseX) - left;
    const height = Math.max(y, baseY) - top;
    layer.x = baseX;
    layer.y = baseY;
    layer.w = x - baseX;
    layer.h = y - baseY;
    const lw = layer.lineWidth;
    const lw2 = lw + lw;
    layer.bounds = [{ x: left - lw, y: top - lw, w: width + lw2, h: height + lw2}, layer.bounds[0]];
  },

  create (
    id: string,
    point: IDrawPoint,
    lineWidth: number,
    strokeStyle: string,
    fillStyle: string
  ) {
    const { x, y } = point;
    return {
      id,
      type: 'rect',
      x,
      y,
      w: 0,
      h: 0,
      bounds: [{ x, y, w: 0, h: 0 }, { x, y, w: 0, h: 0 }],
      lineWidth,
      strokeStyle,
      fillStyle,
    };
  },
}

export default Rect;