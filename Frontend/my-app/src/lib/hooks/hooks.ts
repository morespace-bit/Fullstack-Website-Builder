// custom hooks basically function custom function
// widely used

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";

// useDispatch + types == customHook

export const useAppDispath = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

// you can use documentation for consulting what to do and what not
// and how to define types and stuff for typescript
