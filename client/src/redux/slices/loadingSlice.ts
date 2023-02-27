import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { Helpers } from '@utils/helper';
import { LodashUtils } from '@utils/lodash';
export interface LoadingOption {
  id?: string;
  title?: string;
  subtitle?: string;
}

interface LoadingState {
  loadings: LoadingOption[];
}

const initialState: LoadingState = {
  loadings: [],
};

const loadingSlice = createSlice({
  name: 'GLOBAL-Loading',
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<LoadingOption>) => {
      const { payload } = action;
      const loading = {
        id: payload.id || Helpers.generateID(),
        title: payload.title || 'Page loading',
        subtitle: payload.subtitle || 'Loading content, please wait',
      };
      const loadings = current(state.loadings);
      state.loadings = [...loadings, loading];
    },
    dismissLoading: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const loadings = current(state.loadings);
      const nextLoadings = loadings.filter((item) => item.id !== id);
      state.loadings = [...nextLoadings];
    },
    dismissMultiLoading: (state, action: PayloadAction<{ ids: string[] }>) => {
      const { ids = [] } = action.payload;
      const loadings = current(state.loadings);
      state.loadings = loadings.filter(
        (item) => !LodashUtils.includes(ids, item.id),
      );
    },
  },
});

export const { setLoadingState, dismissLoading, dismissMultiLoading } =
  loadingSlice.actions;

export default loadingSlice.reducer;
