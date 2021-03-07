import { IDrawLayerLine, IDrawPoint } from "../app/draw/draw.types"

export const render = (layer: IDrawLayerLine, ctx: CanvasRenderingContext2D) => {
  if (!layer || !layer.points || !layer.points.length) {
    return;
  }
  const points = layer.points;
  const { x: baseX, y: baseY } = layer.base;
  ctx.beginPath();
  ctx.lineWidth = layer.lineWidth;
  ctx.strokeStyle = layer.strokeStyle;
  ctx.moveTo(baseX, baseY);
  for (let cnt = 1; cnt < points.length; cnt++) {
    ctx.lineTo(
      baseX + points[cnt].x,
      baseY + points[cnt].y,
    );
  }
  ctx.stroke();
}

export const change = (layer: IDrawLayerLine, point: IDrawPoint) => {
  if (!layer || !layer.points) {
    return;
  }
  const { x: baseX, y: baseY } = layer.base;
  const {x, y} = point;
  layer.id = layer.points.length.toString();
  layer.points.push({ x: x - baseX, y: y - baseY });
}

export const create = (
  point: IDrawPoint,
  lineWidth: number,
  strokeStyle: string,
) => {
    const {x, y} = point;
    return {
      id: '',
      type: 'line',
      points: [{x: 0, y: 0}],
      base: {x, y},
      lineWidth,
      strokeStyle,
    };
}