export interface ICanvasPoint {
  x: number;
  y: number;
};
interface ICanvasSize {
  w: number;
  h: number;
};

interface ICanvasRect extends ICanvasPoint, ICanvasSize {

};

interface ICanvasLayer {
  type: string;
  bounding: ICanvasRect;
}
export interface ICanvasStrokeStyles {
  lineWidth: number;
  strokeStyle: string;
}

export interface ICanvasShapeStyles extends ICanvasStrokeStyles {
  fillStyle: string;
}

export interface ICanvasLayerCircle extends ICanvasLayer, ICanvasShapeStyles {
  type: 'circle';
  center: ICanvasPoint;
  radius: number;
}
export interface ICanvasLayerRect extends ICanvasLayer, ICanvasShapeStyles, ICanvasRect {
  type: 'rect';
}

export interface ICanvasLayerLine extends ICanvasLayer, ICanvasShapeStyles {
  type: 'line';
  points: ICanvasPoint[];
}

export type CanvasLayer = ICanvasLayerCircle | ICanvasLayerRect | ICanvasLayerLine;
