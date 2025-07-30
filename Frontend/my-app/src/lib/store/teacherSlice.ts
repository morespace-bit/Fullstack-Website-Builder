import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState: {
    teacherName: "",
    teacherPassword: "",
  },

  // reducers just meaning defining a structure of a functoin
  // what the actual function is supposed to do
  reducers: {
    setTeacherName(state, action) {
      state.teacherName = "haha";
    },
    setTeacherPassword(state, action) {
      state.teacherPassword = "hehe";
    },
  },
});

export const { setTeacherName } = teacherSlice.actions;

export default teacherSlice.reducer;

// the create slice function returns a object whre the action are
// automatically generated
