export type CanvasPoint = number[];

interface ICanvasLayer {
  type: 'circle' | 'rect';
  base: CanvasPoint;
}

interface ICanvasStroke {
  lineWidth: number;
  strokeStyle: string;
}

interface ICanvasFill {
  fillColor: number;
}

export interface ICanvasLayerCircle extends ICanvasLayer, ICanvasStroke {
  // type: 'circle',
  center: CanvasPoint;
  radius: number;
}

export interface ICanvasLayerRect extends ICanvasLayer, ICanvasStroke, ICanvasFill {
  // type: 'rect',
  from: CanvasPoint;
  to: CanvasPoint;
}

export type CanvasLayer = ICanvasLayerCircle | ICanvasLayerRect;
