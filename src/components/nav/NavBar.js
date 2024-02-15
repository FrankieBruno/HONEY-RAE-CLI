import { Link } from "react-router-dom"
import "./NavBar.css"
import logo from "./logo.png"

export const NavBar = () => {
  return (
    <div className="navContainer">
      <img src={logo} alt="Honey Rae" className="navbarLogo" />
      <ul className="navbar">
        <li className="navbarItem">
          <Link className="navbarLink" to="/employees">EMPLOYEES</Link>
          {/* <Link className="navbarLink" to="/customers">CUSTOMERS</Link> */}
        </li>
        <li className="navbarItem">
          <Link className="navbarLink" to="/">SERVICE TICKETS</Link>
        </li>
        <li className="logoutBtn">
          <Link className="navbarLink" to="/login"
            onClick={
              () => {
                localStorage.removeItem("honeyrae")
              }
            }>
            LOG OUT →
          </Link>
        </li>
      </ul>
    </div>
  )

}
