import { Navigate, Outlet } from "react-router-dom"
import { isStaff } from "../utils/isStaff"
import { NavBar } from "../components/nav/NavBar"
import { EmployeeNavBar } from "../components/nav/EmployeeNavBar"

export const Authorized = () => {
  if (localStorage.getItem("honeyrae")) {
    const navbar = isStaff() ? <EmployeeNavBar /> : <NavBar />
    return <>
      {navbar}
      <Outlet />
    </>
  }
  return <Navigate to='/login' replace />
}
