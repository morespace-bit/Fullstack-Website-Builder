// collect all the sice and store them

import { configureStore } from "@reduxjs/toolkit";
import teacherSlice from "./teacherSlice";

const store = configureStore({
  reducer: {
    teacherSlice,
  },
});

export default store;

// this is the type of dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

//now what next
// react-redux --> package

// this is package that is used to estabilish react/next(basically next is the framework of react)
// to the redux the statemanagement
