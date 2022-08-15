import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface IConfigState {
  selected: string | 'none';
  area: number;
}

const initialState: IConfigState = {
  selected: '',
  area: 0,
};

export const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
    folderSelected: (state: IConfigState, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    backDayCalendar: (state: IConfigState) => {
      
    },
  },
});

console.log(configSlice);

// Action creators are generated for each case reducer function
export const calendarActions = configSlice.actions;

const configReducer = configSlice.reducer;
export default configReducer;