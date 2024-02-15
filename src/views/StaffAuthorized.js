import { Navigate, Outlet } from "react-router-dom"
import { isStaff } from "../utils/isStaff"
import { EmployeeNavBar } from "../components/nav/EmployeeNavBar"

export const StaffAuthorized = () => {
  if (isStaff()) {
    return <>
      <EmployeeNavBar />
      <Outlet />
    </>
  }
  return <Navigate to='/' replace />
}
