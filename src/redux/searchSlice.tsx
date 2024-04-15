"use client";

import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { value: "", auth: false, notification: "" },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setIsAuth: (state, action) => {
      state.auth = action.payload;
    },
    setNotify: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setValue, setIsAuth, setNotify } = searchSlice.actions;
export default searchSlice.reducer;
