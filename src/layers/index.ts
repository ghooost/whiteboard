import Line from './renderers/line';
import Circle from './renderers/circle';
import Rect from './renderers/rect';
import { LayerType } from '../store/draw/draw.types';

export function getRenderer(type: LayerType) {
  switch(type) {
    case 'circle':
      return Circle;
    case 'line':
      return Line;
    case 'rect':
      return Rect;
  }
}

