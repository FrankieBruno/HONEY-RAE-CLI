import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addEmployee } from "../../managers/EmployeeManager"

export const EmployeeForm = () => {

  const [employee, change] = useState({
    name: "",
    specialty: ""
  })
  const navigate = useNavigate()

  const hireEmployee = (evt) => {
    evt.preventDefault()

    addEmployee(employee)
      .then(() => {
        navigate("/employees")
      })
  }

  return (
    <form>
      <h2>New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            onChange={
              (evt) => {
                const copy = { ...employee }
                copy.name = evt.target.value
                change(copy)
              }
            }
            required autoFocus
            type="text"
            className="form-control"
            placeholder="Full name"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="specialty">Specialty:</label>
          <input
            onChange={
              (evt) => {
                const copy = { ...employee }
                copy.specialty = evt.target.value
                change(copy)
              }
            }
            required autoFocus
            type="text"
            className="form-control"
            placeholder="Technical specialty"
          />
        </div>
      </fieldset>
      <button onClick={hireEmployee} className="btn btn-primary">
        Hire Employee
      </button>
    </form>
  )
}
