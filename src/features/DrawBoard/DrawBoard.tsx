import React, { useEffect, useRef, useState } from 'react';
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
  const [size, setSize] = useState([0, 0]);

  const mouseFuncRef = useRef((e: MouseEvent) => {
    const { offsetX: x, offsetY: y } = e;
    switch (e.type) {
      case 'mouseup':
        drawModeRef.current = false;
        dispatch(funalizeLevel());
        e.stopPropagation();
        e.preventDefault();
        break;
      case 'mousedown':
        drawModeRef.current = true;
        dispatch(addLevel({ x, y }));
        e.stopPropagation();
        e.preventDefault();
        break;
      case 'mousemove':
        if (drawModeRef.current) {
          dispatch(updateLevel({ x, y }));
          e.stopPropagation();
          e.preventDefault();
        }
        break;
    }
  });

  const timerRef = useRef(null as NodeJS.Timeout | null);

  const resizeFuncRef = useRef(() => {
    const rect = boardNodeRef.current?.getBoundingClientRect();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setSize([rect?.width || 0, rect?.height || 0]);
    }, 100)
  });

  useEffect(() => {
    boardNodeRef.current?.addEventListener('mousedown', mouseFuncRef.current);
    boardNodeRef.current?.addEventListener('mouseup', mouseFuncRef.current);
    boardNodeRef.current?.addEventListener('mousemove', mouseFuncRef.current);
    window.addEventListener('resize', resizeFuncRef.current);
    resizeFuncRef.current();
    return () => {
      boardNodeRef.current?.removeEventListener('mousedown', mouseFuncRef.current);
      boardNodeRef.current?.removeEventListener('mouseup', mouseFuncRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      boardNodeRef.current?.removeEventListener('mousemove', mouseFuncRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      window.removeEventListener('resize', resizeFuncRef.current);
    }
  }, [boardNodeRef]);

  return (
    <div className={styles.board} ref={boardNodeRef}>
      <Layers mode='bottom' width={size[0]} height={size[1]}></Layers>
      <CurrentLayer width={size[0]} height={size[1]}></CurrentLayer>
      <Layers mode='top' width={size[0]} height={size[1]}></Layers>
    </div>
  );
}
