import React, { useEffect, useRef } from 'react';
import styles from './DrawRenderer.module.css';
import {
  addLevel,
  updateLevel,
  finalizeLevel,

  selectLayers,
  selectCurrentLayerIndex,
  selectCurrentLayer,

} from '../../store/draw';
import { useDispatch, useSelector } from 'react-redux';
import * as line from '../../layers/line';
import * as circle from '../../layers/circle';
import * as rect from '../../layers/rect';
import { DrawLayer } from '../../store/draw/draw.types';
import useResize from '../../hooks/resize';
import useCanvasDrawContext from '../../hooks/canvasDrawContext';
import useMouse, { UseMouseOptions } from '../../hooks/mouse';

function reDrawLayers(
  ctx: CanvasRenderingContext2D | null,
  layers: (DrawLayer | null)[],
  size: number[],
) {
  if (!ctx) {
    return;
  }
  ctx.clearRect(0, 0, size[0], size[1]);
  layers.forEach((layer) => {
    if (!layer) {
      return;
    }
    switch (layer.type) {
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
};


export function DrawRenderer() {
  const dispatch = useDispatch();

  const boardRef = useRef(null as HTMLDivElement | null);
  const backgroundRef = useRef(null as HTMLCanvasElement | null);
  const currentRef = useRef(null as HTMLCanvasElement | null);
  const foregroundRef = useRef(null as HTMLCanvasElement | null);
  const mouseOptions = useRef<UseMouseOptions>({
    onMouseDown (x, y) {
      dispatch(addLevel({ x, y }));
    },
    onMouseMove (x, y) {
      dispatch(updateLevel({ x, y }));
    },
    onMouseUp (x, y) {
      dispatch(finalizeLevel());
    }
  });

  useMouse(boardRef, mouseOptions.current);
  const size = useResize(boardRef);

  const currentLayerIndex = useSelector(selectCurrentLayerIndex);
  const currentLayer = useSelector(selectCurrentLayer);
  const layers = useSelector(selectLayers);

  const ctxBack = useCanvasDrawContext(backgroundRef);
  const ctxCurrent = useCanvasDrawContext(currentRef);
  const ctxTop = useCanvasDrawContext(foregroundRef);

  useEffect(()=> {
    reDrawLayers(
      ctxBack,
      layers.slice(0, currentLayerIndex),
      size,
    );
    reDrawLayers(
      ctxTop,
      layers.slice(currentLayerIndex + 1),
      size,
    );
  }, [
    currentLayerIndex,
    layers,
    ctxBack,
    ctxTop,
    size,
  ]);

  useEffect(() => {
    reDrawLayers(
      ctxCurrent,
      [currentLayer],
      size,
    );
  }, [
    currentLayerIndex,
    currentLayer,
    ctxCurrent,
    size,
  ]);

  return (
    <div ref={boardRef} className={styles.board}>
      <canvas ref={backgroundRef} className={styles.canvas} width={size[0]} height={size[1]} />
      <canvas ref={currentRef} className={styles.canvas}  width={size[0]} height={size[1]} />
      <canvas ref={foregroundRef} className={styles.canvas}  width={size[0]} height={size[1]} />
    </div>
  );
}
