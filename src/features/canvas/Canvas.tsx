import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCanvas,
} from './Canvas.store';
import styles from './Canvas.module.css';
import { CanvasLayer, ICanvasLayerCircle, ICanvasLayerRect } from './Canvas.types';

const renderers = {
  circle (ctx: CanvasRenderingContext2D, _layer: CanvasLayer) {
    const layer = _layer as ICanvasLayerCircle;
    ctx.beginPath();
    ctx.lineWidth = layer.lineWidth;
    ctx.strokeStyle = layer.strokeStyle;
    ctx.arc(
      layer.base[0] + layer.center[0],
      layer.base[1] + layer.center[1],
      layer.radius,
      0,
      2 * Math.PI,
    );
    ctx.stroke();
  },
  rect(ctx: CanvasRenderingContext2D, _layer: CanvasLayer) {
    const layer = _layer as ICanvasLayerRect;
    ctx.beginPath();
    ctx.lineWidth = layer.lineWidth;
    ctx.strokeStyle = layer.strokeStyle;
    ctx.rect(
      layer.base[0] + layer.from[0],
      layer.base[1] + layer.from[1],
      layer.base[0] + layer.to[0],
      layer.base[1] + layer.to[1],
    );
    ctx.stroke();
  },
}

export function Canvas() {
  const [ctx, setCtx] = useState(null as CanvasRenderingContext2D | null);
  const layers = useSelector(selectCanvas);
  const canvasRef = useCallback((node: HTMLCanvasElement) => {
    if (node !== null) {
      const ctx = node.getContext('2d');
      setCtx(ctx);
      const {width, height} = node.getBoundingClientRect();
      node.width = width;
      node.height = height;
    }
  }, []);
  if (ctx) {
    layers.forEach(
      (layer) =>
        renderers[layer.type] &&
        renderers[layer.type](ctx, layer)
    );
  }

  return (
    <canvas className={styles.canvas} ref={canvasRef}></canvas>
  );
}
