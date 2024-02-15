import { Link } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/employees">Employees</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/customers">Customers</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/">Service Tickets</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/login"
          onClick={
            () => {
              localStorage.removeItem("honeyrae")
            }
          }>
          Logout
        </Link>
      </li>
    </ul>
  )
}
