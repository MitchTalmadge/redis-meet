import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  cameraId: string;
} = {
  cameraId: "",
}

export const avSlice = createSlice({
  name: "av",
  initialState,
  reducers: {
    setCameraId: (state, action) => {
      state.cameraId
    }
  }
})