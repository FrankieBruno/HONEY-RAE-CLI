import { useEffect, useState } from "react"
// import { TicketHeader } from "./TicketHeader"
// import { TicketBody } from "./TicketBody"
// import { TicketFooter } from "./TicketFooter"
import { Link } from "react-router-dom"
import { GoPersonAdd } from "react-icons/go";
// import { HiDocumentMinus } from "react-icons/hi2";
import { getAllEmployees } from "../../managers/EmployeeManager"
import { updateTicket } from "../../managers/TicketManager"
import "./Tickets.css"

// export const TicketCard = ({ ticket }) => {
//   return (
//     <section className={`ticket ${ticket.emergency ? 'emergency' : ''}`}>
//       <TicketHeader ticket={ticket} />
//       <TicketBody ticket={ticket} />
//       <TicketFooter ticket={ticket} />
//     </section>
//   )
// }

export const TicketCard = ({ ticket }) => {
  const [employees, setEmployees] = useState([])
  const [assignedTo, setAssignedTo] = useState(ticket.employee?.id)
  console.log(ticket)

  useEffect(() => {
    getAllEmployees()
      .then((res) => setEmployees(res))
  }, [])

  const handleAssignedChange = (employeeId) => {
    if (employeeId === 0) {
      setAssignedTo(0)
    } else {
      setAssignedTo(parseInt(employeeId))
    }
  }

  useEffect(() => {
    // if (assignedTo !== null) {
      const updatedTicket = {
        ...ticket,
        employee: assignedTo
      }
      console.log(updatedTicket)
      updateTicket(updatedTicket).then((data) => console.log(data))
    // }
  }, [assignedTo])

  return (
    <div className="ticketCardContainer">
      <div className="left">
        <div className="ticketDetailContainer">
          <span className="ticketNumber">Ticket #{ticket.id}</span>
          {!ticket.date_completed && <span className="ticketDate">{ticket.date_completed}sadfas</span>}
        </div>
        <Link className="ticketDescription" to={`/tickets/${ticket.id}`}>{ticket.description}</Link>
      </div>

      <div className="right">
        {/* <div className="iconBtn">
          <p className="rightItem">Assign</p>
        </div> */}
        <div className="reportedByContainer">
          {/* <HiDocumentMinus /> */}
          <p className="reportedByText">Reported by: {ticket.customer.full_name}</p>
        </div>

        <div className="iconBtn">
          <GoPersonAdd />
          <select className="employeeSelect" onChange={(e) => handleAssignedChange(parseInt(e.target.value))}>
            <option selected={assignedTo === null} value={0}>Unassigned</option>
            {employees.map(employee => {
              return (
                <option selected={assignedTo === parseInt(employee?.id)} key={employee.id} value={employee.id}>
                  {employee.full_name} | {employee.specialty}
                </option>
              )
            })}
          </select>
        </div>

        {/* <div className="iconBtn">
          <HiDocumentMinus />
          <p className="rightItem">Unclaimed</p>
        </div> */}
      </div>
    </div>
  )
}