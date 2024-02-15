import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { deleteEmployeeById, getEmployeeById, updateEmployee } from "../../managers/EmployeeManager"
export const Employee = () => {
    const [employee, setEmployee] = useState({})
    const { employeeId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            getEmployeeById(employeeId).then((res) => setEmployee(res))
        },
        [employeeId]
    )

    return (
        <div className="ticketListContainer">
            <h1 className="ticketListHeading">EMPLOYEE</h1>
            <section className="employee">
                <h2 className="employee__name">{employee.full_name}</h2>
                <div className="employee__specialty">Specialty is {employee.specialty}</div>
                <div className="updateForm">
                    <input type="text" id="specialty" value={employee.specialty}
                        onChange={(e) => setEmployee({ ...employee, specialty: e.target.value })} />
                    <button onClick={() => updateEmployee(employee.id, employee)}>Update</button>
                </div>
            </section>

            <button onClick={() => deleteEmployeeById(employee.id).then(() => navigate('/employees'))}>Delete Employee</button>
        </div>
    )
}
