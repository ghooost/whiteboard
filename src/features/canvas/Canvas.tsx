import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addLevel,
  updateLevel,
  selectLayers,
} from './Canvas.store';
import styles from './Canvas.module.css';
import { CanvasLayer, ICanvasLayerCircle, ICanvasLayerLine, ICanvasLayerRect, ICanvasShapeStyles } from './Canvas.types';

function colorShape(ctx: CanvasRenderingContext2D, settings: ICanvasShapeStyles) {
  if (settings.fillStyle) {
    ctx.fillStyle = settings.fillStyle;
    ctx.fill();
  }
  if (settings.strokeStyle && settings.lineWidth) {
    ctx.strokeStyle = settings.strokeStyle;
    ctx.lineWidth = settings.lineWidth;
    ctx.stroke();
  }
}

const renderers = {
  circle(ctx: CanvasRenderingContext2D, _layer: CanvasLayer) {
    const layer = _layer as ICanvasLayerCircle;
    ctx.beginPath();
    ctx.arc(
      layer.bounding.x + layer.center.x,
      layer.bounding.y + layer.center.y,
      layer.radius,
      0,
      2 * Math.PI,
    );
    colorShape(ctx, layer);
  },
  rect(ctx: CanvasRenderingContext2D, _layer: CanvasLayer) {
    const layer = _layer as ICanvasLayerRect;
    ctx.beginPath();
    ctx.rect(
      layer.bounding.x + layer.x,
      layer.bounding.y + layer.y,
      layer.bounding.x + layer.w,
      layer.bounding.y + layer.h,
    );
    colorShape(ctx, layer);
  },
  line(ctx: CanvasRenderingContext2D, _layer: CanvasLayer) {
    const layer = _layer as ICanvasLayerLine;
    ctx.beginPath();
    ctx.lineWidth = layer.lineWidth;
    ctx.strokeStyle = layer.strokeStyle;
    layer.points.forEach((point, index) => {
      if (index) {
        ctx.lineTo(point.x, point.y);
      } else {
        ctx.moveTo(point.x, point.y);
      };
    });
    if (layer.strokeStyle && layer.lineWidth) {
      ctx.strokeStyle = layer.strokeStyle;
      ctx.lineWidth = layer.lineWidth;
      ctx.stroke();
    }
  },
}

export function Canvas() {
  const dispatch = useDispatch();
  const [ctx, setCtx] = useState(null as CanvasRenderingContext2D | null);
  const layers = useSelector(selectLayers);
  const canvasNodeRef = useRef(null as HTMLCanvasElement | null);
  const drawModeRef = useRef(false);
  const mouseFuncRef = useRef((e: MouseEvent) => {
    const {offsetX: x, offsetY: y} = e;
    switch (e.type) {
      case 'mouseup':
        drawModeRef.current = false;
        break;
      case 'mousedown':
        drawModeRef.current = true;
        dispatch(addLevel({x, y}));
        break;
      case 'mousemove':
        if (drawModeRef.current) {
          dispatch(updateLevel({x, y}));
        }
        break;
    }
  });
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

  useEffect(() => {
    if (canvasNodeRef.current) {
      canvasNodeRef.current.addEventListener('mousedown', mouseFuncRef.current);
      canvasNodeRef.current.addEventListener('mouseup', mouseFuncRef.current);
      canvasNodeRef.current.addEventListener('mousemove', mouseFuncRef.current);
    }
    return () => {
      if (canvasNodeRef.current) {
        canvasNodeRef.current.removeEventListener('mousedown', mouseFuncRef.current);
        canvasNodeRef.current.removeEventListener('mouseup', mouseFuncRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        canvasNodeRef.current.removeEventListener('mousemove', mouseFuncRef.current);
      }
    }
  }, [canvasRef]);

  if (ctx) {
    ctx.clearRect(0, 0, canvasNodeRef.current?.width || 0, canvasNodeRef.current?.height || 0);
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
