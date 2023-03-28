import { createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from 'grafana-7.3.6/public/app/types/application';

export const initialState: ApplicationState = {
  logActions: false,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    toggleLogActions: state => ({ ...state, logActions: !state.logActions }),
  },
});

export const { toggleLogActions } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
