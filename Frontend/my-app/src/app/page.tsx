"use client";

import { useAppDispath } from "@/lib/hooks/hooks";
import { setTeacherName } from "@/lib/store/teacherSlice";
import { useState } from "react";
import { useDispatch, UseDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useAppDispath();
  let name = "Nirmal";
  dispatch(setTeacherName(name));

  return (
    <>
      <h1>This is going to be the home page</h1>
    </>
  );
}
