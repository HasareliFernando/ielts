import { configureStore, combineReducers } from "@reduxjs/toolkit";
import essayReducer from "./essaySlice";

const rootReducer = combineReducers({
  essay: essayReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;