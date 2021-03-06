import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CanvasLayer } from './Canvas.types';

interface CanvasState {
  layers: CanvasLayer[],
}

const initialState: CanvasState = {
  layers: [
    {
      type:'circle',
      base: [0, 0],
      center: [20, 20],
      radius: 20,
      lineWidth: 1,
      strokeStyle: 'black',
    },
    {
      type: 'circle',
      base: [30, 30],
      center: [20, 20],
      radius: 20,
      lineWidth: 3,
      strokeStyle: 'red',
    },
  ],
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    clear: state => {
      state.layers = [];
    }
  },
});

export const { clear } = canvasSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCanvas = (state: RootState) => state.canvas.layers;

export default canvasSlice.reducer;
