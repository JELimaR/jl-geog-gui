import { configureStore /*, Action */ } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import configReducer from './configSlice';
// import { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: {
    config: configReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
//export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export type RootState = ReturnType<typeof store.getState>;

export default store;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;