import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topic: "",
  introduction: "",
  body1: "",
  body2: "",
  conclusion: "",
};

const essaySlice = createSlice({
  name: "essay",
  initialState,
  reducers: {
    setEssay: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearEssay: () => initialState,
  },
});

export const { setEssay, clearEssay } = essaySlice.actions;
export default essaySlice.reducer;