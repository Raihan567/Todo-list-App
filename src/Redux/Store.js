import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./Slice/TodoSlice";

const store = configureStore({
  reducer: {
    // todo reducer
    todo : TodoReducer
  },
});

export default store;
