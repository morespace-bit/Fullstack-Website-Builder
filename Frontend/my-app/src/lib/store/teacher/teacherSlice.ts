import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITeacherData {
  teacherEmail: string;
  teacherName: string;
  teacherPhoneNumber: string;
}

interface IInitialState {
  teacher: ITeacherData;
  status: Status;
}

const initialState: IInitialState = {
  teacher: {
    teacherEmail: "",
    teacherName: "",
    teacherPhoneNumber: "",
  },
  status: Status.LOADING,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: initialState,
  reducers: {
    setTeacher(state: IInitialState, action: PayloadAction<ITeacherData>) {
      state.teacher = action.payload;
    },

    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setStatus, setTeacher } = teacherSlice.actions;

export default teacherSlice.reducer;
