import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./Slice/TodoSlice";

const store = configureStore({
  reducer: {
    // todo reducer
    todo : TodoSlice
  },
});

export default store;
