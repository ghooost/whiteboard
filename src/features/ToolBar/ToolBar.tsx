import React from 'react';
import styles from './ToolBar.module.css';
import {
  selectLayerType,
  setLayerType,
} from '../../store/draw';
import { useDispatch, useSelector } from 'react-redux';
import { LayerType } from '../../store/draw/draw.types';

interface ILayerTypeButtonRecord {
  id: LayerType;
  label: string;
};

export function ToolBar() {
  const dispatch = useDispatch();
  const layerType = useSelector(selectLayerType);
  const buttons: ILayerTypeButtonRecord[] = [
    { id: 'circle', label: 'Circle' },
    { id: 'rect', label: 'Rect' },
    { id: 'line', label: 'Line' },
  ];
  return (
    <div className={styles.bar}>
      {buttons.map((b) => (
        <button
          key={b.id}
          className={b.id === layerType ? styles.sel : ''}
          onClick={() => dispatch(setLayerType(b.id))}
        >{b.label}</button>
      ))}
    </div>
  );
}
