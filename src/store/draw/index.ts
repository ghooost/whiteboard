import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { DrawLayer, IDrawLayerCircle, IDrawLayerLine, IDrawLayerRect, IDrawPoint, LayerType } from './draw.types';
import * as line from '../../layers/line';
import * as circle from '../../layers/circle';
import * as rect from '../../layers/rect';

interface IDrawState {
  layerType: LayerType;
  lineWidth: number;
  strokeStyle: string;
  fillStyle: string;
  layers: DrawLayer[];
  layerCurrentIndex: number;
  layersBottom: DrawLayer[];
  layersTop: DrawLayer[];
  layersCurrent: DrawLayer[];
}

const defCircle1 = circle.create(
  { x: 20, y: 20 },
  2,
  'red',
  '',
) as IDrawLayerCircle;
defCircle1.radius = 10;

const defCircle2 = circle.create(
  { x: 20, y: 20 },
  2,
  'green',
  '',
) as IDrawLayerCircle;
defCircle2.radius = 20;

const initialState: IDrawState = {
  layerType: 'circle',
  fillStyle: 'rgba(0,0,0,0)',
  lineWidth: 2,
  strokeStyle: 'rgb(0,0,0)',
  layers: [defCircle1, defCircle2],
  layerCurrentIndex: 0,
  layersBottom: [defCircle1, defCircle2],
  layersCurrent: [],
  layersTop: [],
};


export const drawSlice = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    clear: state => {
      state.layers = [];
      state.layerCurrentIndex = 0;
    },
    addLevel: (state, action: PayloadAction<IDrawPoint>) => {
      let newLayer: DrawLayer | null = null;
      switch(state.layerType) {
        case 'line':
          newLayer = line.create(
            action.payload,
            state.lineWidth,
            state.strokeStyle,
          ) as IDrawLayerLine;
          break;
        case 'circle':
          newLayer = circle.create(
              action.payload,
              state.lineWidth,
              state.strokeStyle,
              state.fillStyle,
            ) as IDrawLayerCircle;
          break;
        case 'rect':
          newLayer = rect.create(
              action.payload,
              state.lineWidth,
              state.strokeStyle,
              state.fillStyle,
            ) as IDrawLayerRect;
          break;
      }
      if (newLayer) {
        state.layerCurrentIndex = state.layers.length;
        state.layers.push(newLayer);
        state.layersCurrent = [newLayer];
        state.layersBottom = state.layers.slice(0);
        state.layersTop = [];
      }
    },
    updateLevel: (state, action: PayloadAction<IDrawPoint>) => {
      const layer = state.layersCurrent[0];
      switch (layer.type) {
        case 'line':
          line.change(layer, action.payload);
          break;
        case 'circle':
          circle.change(layer, action.payload);
          break;
        case 'rect':
          rect.change(layer, action.payload);
          break;
      }
    },
    funalizeLevel: (state) => {
      state.layers[state.layerCurrentIndex] = state.layersCurrent[0];
    },
    setLayerType: (state, action: PayloadAction<LayerType>) => {
      state.layerType = action.payload;
    }
  },
});

export const {
  addLevel,
  updateLevel,
  funalizeLevel,
  setLayerType,
} = drawSlice.actions;

export const selectCurrentLayer = (state: RootState) =>
  state.draw.layersCurrent;

export const selectTopLayers = (state: RootState) =>
  state.draw.layersTop;

export const selectBottomLayers = (state: RootState) =>
  state.draw.layersBottom;

export const selectLayerType = (state: RootState) =>
  state.draw.layerType;

export default drawSlice.reducer;
