import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DrawLayer } from '../../store/draw/draw.types';
import styles from './CurrentLayer.module.css';
import * as line from '../../layers/line';
import * as circle from '../../layers/circle';
import * as rect from '../../layers/rect';
import {
  selectCurrentLayer,
} from '../../store/draw';

type CurrentLayerProps = {
  width: number;
  height: number;
};

export function CurrentLayer(props: CurrentLayerProps) {
  const layers = useSelector(selectCurrentLayer) as DrawLayer[];
  const canvasNodeRef = useRef(null as HTMLCanvasElement | null);

  useEffect(() => {
    const node = canvasNodeRef.current;
    const ctx = node?.getContext('2d');
    if (ctx && node) {
      if (node.width !== props.width || node.height !== props.height) {
        node.width = props.width;
        node.height = props.height;
      }
      ctx.clearRect(0, 0, node.width || 0, node.height || 0);
      layers.forEach((layer) => {
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
  }, [props.width, props.height, layers]);

  return (
    <canvas
      className={styles.canvas}
      ref={canvasNodeRef}
    />
  );
}
