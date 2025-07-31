import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacherInitialState } from "../types/type";

const teacherInitialState: ITeacherInitialState = {
  teacherName: "",
  teacherPassword: "",
};

const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState: teacherInitialState,

  // reducers just meaning defining a structure of a functoin
  // what the actual function is supposed to do
  reducers: {
    setTeacherName(state: ITeacherInitialState, action: PayloadAction<string>) {
      state.teacherName = action.payload;
    },
    setTeacherPassword(state, action) {
      state.teacherPassword = action.payload;
    },
  },
});

// this is used to call this action when needed

export const { setTeacherName } = teacherSlice.actions;

// i think the reducer is exported for the store to be used
export default teacherSlice.reducer;

// the create slice function returns a object whre the action are
// automatically generated
