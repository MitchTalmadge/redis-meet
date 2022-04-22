import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { avSlice } from "./slices/av";

export const store = configureStore({
  reducer: {
    av: avSlice.reducer
  }
});

export const useAppDispatch = useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;