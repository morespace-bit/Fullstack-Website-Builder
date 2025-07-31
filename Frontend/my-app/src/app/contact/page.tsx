import { useAppSelector } from "@/lib/hooks/hooks";

export default function page() {
  const data = useAppSelector((store) => store.teacherSlice);

  return (
    <>
      <h1>This is going to be the contact page</h1>
    </>
  );
}
