import React, { useCallback, useEffect, useRef } from 'react';
import { Layers } from '../Layers';
import styles from './DrawBoard.module.css';

import {
  addLevel,
  updateLevel,
  funalizeLevel,
} from '../../store/draw';
import { useDispatch } from 'react-redux';
import { CurrentLayer } from '../CurrentLeyer';

export function DrawBoard() {
  const dispatch = useDispatch();
  const boardNodeRef = useRef(null as HTMLDivElement | null);
  const drawModeRef = useRef(false);
  const mouseFuncRef = useRef((e: MouseEvent) => {
    const { offsetX: x, offsetY: y } = e;
    switch (e.type) {
      case 'mouseup':
        drawModeRef.current = false;
        dispatch(funalizeLevel());
        break;
      case 'mousedown':
        drawModeRef.current = true;
        dispatch(addLevel({ x, y }));
        break;
      case 'mousemove':
        if (drawModeRef.current) {
          dispatch(updateLevel({ x, y }));
        }
        break;
    }
  });
  const canvasRef = useCallback((node: HTMLDivElement) => {
    boardNodeRef.current = node;
  }, []);

  useEffect(() => {
    if (boardNodeRef.current) {
      boardNodeRef.current.addEventListener('mousedown', mouseFuncRef.current);
      boardNodeRef.current.addEventListener('mouseup', mouseFuncRef.current);
      boardNodeRef.current.addEventListener('mousemove', mouseFuncRef.current);
    }
    return () => {
      if (boardNodeRef.current) {
        boardNodeRef.current.removeEventListener('mousedown', mouseFuncRef.current);
        boardNodeRef.current.removeEventListener('mouseup', mouseFuncRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        boardNodeRef.current.removeEventListener('mousemove', mouseFuncRef.current);
      }
    }
  }, [canvasRef]);



  return (
    <div className={styles.board} ref={canvasRef}>
      <Layers mode='bottom'></Layers>
      <CurrentLayer></CurrentLayer>
      <Layers mode='top'></Layers>
    </div>
  );
}
