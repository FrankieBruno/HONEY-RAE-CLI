import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addEmployee, getAllEmployees } from "../../managers/EmployeeManager"
import "./Employees.css"

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const [specialties, setSpecialties] = useState("")
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  })

  const navigate = useNavigate()

  useEffect(
    () => {
      getAllEmployees()
        .then((res) => setEmployees(res))
    },
    []
  )

  useEffect(() => {
    const justSpecialties = employees.map(emp => emp.specialty)
    setSpecialties(justSpecialties.join(", "))
  }, [employees])


  return (
    <div className="ticketListContainer">
      <h1 className="ticketListHeading">EMPLOYEES</h1>

      <div className="">
        <strong>Team Specialties</strong>: {specialties}
      </div>

      <h2>Employee Roster</h2>

      <div className="employeeListContainer">
        {
          employees.map(
            (employee) => {
              return <Link key={`employee--${employee.id}`} to={`/employees/${employee.id}`}>
                <p className="employees">{employee.full_name}</p>
              </Link>
            }
          )
        }
      </div>
      <input type="text" id="newEmployeeFirst" value={newEmployee.firstName} placeholder="First name" onChange={e => setNewEmployee({ ...newEmployee, firstName: e.target.value })} className="newEmployeeInput" />
      <input type="text" id="newEmployeeLast" value={newEmployee.lastName} placeholder="Last name" onChange={e => setNewEmployee({ ...newEmployee, lastName: e.target.value })} className="newEmployeeInput" />
      <input type="text" id="newEmployeeUsername" value={newEmployee.username} placeholder="Username" onChange={e => setNewEmployee({ ...newEmployee, username: e.target.value })} className="newEmployeeInput" />
      <input type="text" id="newEmployeeEmail" value={newEmployee.email} placeholder="Email" onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} className="newEmployeeInput" />
      <button onClick={() => addEmployee(newEmployee).then((data) => navigate(`/employees/${data.id}`))} className="newEmployeeBtn">Add Employee</button>
    </div >
  )
}
