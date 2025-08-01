import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInstitute {
  instituteName: string;
  instituteEmail: string;
  institutePhoneNumber: string;
  instituteAddress: string;
}

interface IInitialState {
  institute: IInstitute;
  status: Status;
}

const initialState: IInitialState = {
  institute: {
    instituteName: "",
    instituteAddress: "",
    instituteEmail: "",
    institutePhoneNumber: "",
  },
  status: Status.LOADING,
};

const instituteSlice = createSlice({
  name: "teacher",
  initialState: initialState,

  reducers: {
    setInstitute(state: IInitialState, action: PayloadAction<IInstitute>) {
      state.institute = action.payload;
    },

    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setInstitute, setStatus } = instituteSlice.actions;

export default instituteSlice.reducer;
