import React, { useCallback, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DrawLayer } from '../../app/draw/draw.types';
import styles from './Layers.module.css';
import * as line from '../../layers/line';
import * as circle from '../../layers/circle';
import * as rect from '../../layers/rect';
import {
  selectBottomLayers,
  selectTopLayers,
} from '../../app/draw/draw';

export type LayersProps = {
  mode: 'bottom' | 'top';
};

export function Layers(props: LayersProps) {
  const [ctx, setCtx] = useState(null as CanvasRenderingContext2D | null);
  const layersBottom = useSelector(selectBottomLayers) as DrawLayer[];
  const layersTop = useSelector(selectTopLayers) as DrawLayer[];

  let layers: DrawLayer[] = [];
  switch (props.mode) {
    case 'bottom':
      layers = layersBottom;
      break;
    case 'top':
      layers = layersTop;
      break;
  }
  const canvasNodeRef = useRef(null as HTMLCanvasElement | null);
  const canvasRef = useCallback((node: HTMLCanvasElement) => {
    if (node !== null) {
      const ctx = node.getContext('2d');
      setCtx(ctx);
      const {width, height} = node.getBoundingClientRect();
      node.width = width;
      node.height = height;
    }
    canvasNodeRef.current = node;
  }, []);

  if (ctx) {
    ctx.clearRect(0, 0, canvasNodeRef.current?.width || 0, canvasNodeRef.current?.height || 0);
    layers.forEach((layer) => {
      switch(layer.type){
        case 'circle':
          circle.render(layer, ctx);
          break;
        case 'rect':
          rect.render(layer, ctx);
          break;
        case 'line':
          line.render(layer, ctx);
          break;
      }
    });
  }

  return (
    <canvas className={styles.canvas} ref={canvasRef}></canvas>
  );
}
