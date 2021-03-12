export type LayerType = 'line' | 'circle' | 'rect';

export interface IDrawPoint {
  x: number;
  y: number;
};

export interface IDrawSize {
  w: number;
  h: number;
};

export interface IDrawRect extends IDrawPoint, IDrawSize {};

export interface IDrawStrokeStyle {
  lineWidth: number;
  strokeStyle: string;
}

export interface IDrawShapeStyle extends IDrawStrokeStyle {
  fillStyle: string;
}

interface IDrawLayerBase {
  id: string;
  type: LayerType;
  bounds: [IDrawRect, IDrawRect];
  base: IDrawPoint;
}

export interface IDrawLayerCircle extends IDrawLayerBase, IDrawShapeStyle {
  type: 'circle';
  radius: number;
}

export interface IDrawLayerRect extends IDrawLayerBase, IDrawShapeStyle, IDrawRect {
  type: 'rect';
}

export interface IDrawLayerLine extends IDrawLayerBase, IDrawStrokeStyle {
  type: 'line';
  points: IDrawPoint[];
}

export type DrawLayer = IDrawLayerCircle | IDrawLayerRect | IDrawLayerLine;
