import { IDrawLayerRect, IDrawPoint } from "../app/draw/draw.types"

export const render = (layer: IDrawLayerRect, ctx: CanvasRenderingContext2D) => {
  if (!layer || !layer.base || !layer.w || !layer.h) {
    return;
  }
  const { x: baseX, y: baseY } = layer.base;
  ctx.beginPath();
  ctx.lineWidth = layer.lineWidth;
  ctx.strokeStyle = layer.strokeStyle;
  ctx.rect(
    baseX,
    baseY,
    layer.w,
    layer.h,
  );
  ctx.stroke();
}

export const change = (layer: IDrawLayerRect, point: IDrawPoint) => {
  if (!layer) {
    return;
  }
  const { x: baseX, y: baseY } = layer.base;
  const {x, y} = point;
  layer.w = x - baseX;
  layer.h = y - baseY;
}

export const create = (
  point: IDrawPoint,
  lineWidth: number,
  strokeStyle: string,
  fillStyle: string) => {
  const { x, y } = point;
  return {
    id: '',
    type: 'rect',
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    base: { x, y },
    lineWidth,
    strokeStyle,
    fillStyle,
  };
}
