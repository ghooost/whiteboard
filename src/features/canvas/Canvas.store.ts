import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CanvasLayer, ICanvasLayerLine, ICanvasPoint } from './Canvas.types';

interface CanvasState {
  mode: string,
  layers: CanvasLayer[],
}

const initialState: CanvasState = {
  mode: '',
  layers: [
    {
      type:'line',
      bounding: {x: 0, y: 0, w: 40, h: 40},
      points: [
        { x: 20, y: 30 },
        { x: 20, y: 40 },
        { x: 40, y: 60 },
        { x: 60, y: 10 },
        { x: 20, y: 30 },
      ],
      lineWidth: 1,
      strokeStyle: 'black',
      fillStyle: '',
    },
    {
      type: 'circle',
      bounding: { x: 30, y: 30, w: 40, h: 40 },
      center: { x: 20, y: 30 },
      radius: 20,
      lineWidth: 3,
      strokeStyle: 'red',
      fillStyle: '',
    },
    {
      type: 'rect',
      bounding: { x: 50, y: 50, w: 40, h: 40 },
      x: 0,
      y: 0,
      w: 40,
      h: 40,
      lineWidth: 3,
      strokeStyle: 'green',
      fillStyle: 'rgba(60, 60, 60, 0.1)',
    },
  ],
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    clear: state => {
      state.layers = [];
    },
    addLevel: (state, action: PayloadAction<ICanvasPoint>) => {
      // console.log('addLevel', action);
      const layer: ICanvasLayerLine = {
        type: 'line',
        points: [action.payload],
        bounding: {
          x: action.payload.x,
          y: action.payload.y,
          w: 0,
          h: 0,
        },
        fillStyle: '',
        lineWidth: 2,
        strokeStyle: 'red',
      };
      state.layers.push(layer);
    },
    updateLevel: (state, action: PayloadAction<ICanvasPoint>) => {
      const layer = state.layers[state.layers.length - 1] as ICanvasLayerLine;
      layer.points.push(action.payload);
    }
  },
});

export const { addLevel, updateLevel } = canvasSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLayers = (state: RootState) => state.canvas.layers;
export const selectMode = (state: RootState) => state.canvas.mode;

export default canvasSlice.reducer;
