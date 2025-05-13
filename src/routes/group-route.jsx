import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function GroupRoute({ groupName }) {
  if (groupName) {
    console.log(11);
  }
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}
