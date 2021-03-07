import { IDrawLayerCircle, IDrawPoint } from "../store/draw/draw.types"

export const render = (layer: IDrawLayerCircle, ctx: CanvasRenderingContext2D) => {
  if (!layer || !layer.base || !layer.radius) {
    return;
  }
  const { x: baseX, y: baseY } = layer.base;
  ctx.beginPath();
  ctx.lineWidth = layer.lineWidth;
  ctx.strokeStyle = layer.strokeStyle;
  ctx.arc(baseX, baseY, layer.radius, 0, Math.PI * 2);
  ctx.stroke();
}

export const change = (layer: IDrawLayerCircle, point: IDrawPoint) => {
  if (!layer) {
    return;
  }
  const { x: baseX, y: baseY } = layer.base;
  const { x, y } = point;
  layer.radius = Math.round(Math.sqrt(Math.pow(x - baseX, 2) + Math.pow(y - baseY, 2)));
}

export const create = (
  point: IDrawPoint,
  lineWidth: number,
  strokeStyle: string,
  fillStyle: string,
) => {
  const { x, y } = point;
  const layer: IDrawLayerCircle = {
    id: '',
    type: 'circle',
    radius: 0,
    base: { x, y },
    lineWidth,
    strokeStyle,
    fillStyle,
  };
  return layer;
}
