import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { DrawLayer, IDrawPoint, LayerType } from './draw.types';
import { getRenderer } from '../../layers';

interface IDrawState {
  layerCounter: number;
  layerType: LayerType;
  lineWidth: number;
  strokeStyle: string;
  fillStyle: string;
  layers: DrawLayer[];
  currentLayerIndex: number;
  currentLayer: DrawLayer | null;
}

const initialState: IDrawState = {
  layerType: 'circle',
  fillStyle: 'rgba(0,0,0,0)',
  lineWidth: 2,
  strokeStyle: 'rgb(0,0,0)',
  layers: [],
  currentLayerIndex: 0,
  currentLayer: null,
  layerCounter: 0,
};


export const drawSlice = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    clear: state => {
      state.layers = [];
      state.currentLayerIndex = 0;
    },
    addLevel: (state, action: PayloadAction<IDrawPoint>) => {
      const id = `l${state.layerCounter++}`;
      const newLayer = getRenderer(state.layerType).create(
        id,
        action.payload,
        state.lineWidth,
        state.strokeStyle,
        state.fillStyle,
      );
      if (newLayer) {
        state.currentLayerIndex = state.layers.length;
        state.currentLayer = newLayer as any;
      }
    },
    updateLevel: (state, action: PayloadAction<IDrawPoint>) => {
      if (!state.currentLayer) {
        return;
      }
      const layer = state.currentLayer;
      getRenderer(layer.type).change(layer as any, action.payload);
    },
    finalizeLevel: (state) => {
      if (!state.currentLayer) {
        return;
      }
      if (state.currentLayerIndex >= state.layers.length) {
        state.layers.push(state.currentLayer);
        state.currentLayer = null;
        state.currentLayerIndex = state.layers.length;
      } else {
        state.layers[state.currentLayerIndex] = state.currentLayer;
        state.currentLayer = null;
      }
    },
    setLayerType: (state, action: PayloadAction<LayerType>) => {
      state.layerType = action.payload;
    }
  },
});

export const {
  addLevel,
  updateLevel,
  finalizeLevel,
  setLayerType,
} = drawSlice.actions;

export const selectLayers = (state: RootState) =>
  state.draw.layers;

export const selectCurrentLayer = (state: RootState) =>
  state.draw.currentLayer;

export const selectCurrentLayerIndex = (state: RootState) =>
  state.draw.currentLayerIndex;

export const selectLayerType = (state: RootState) =>
  state.draw.layerType;

export default drawSlice.reducer;
