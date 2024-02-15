import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { isStaff } from "../../utils/isStaff"
import { getAllEmployees } from "../../managers/EmployeeManager"
import { getTicketById, deleteTicket, updateTicket } from "../../managers/TicketManager"
import { ticketStatus } from "./TicketStatus"

export const Ticket = () => {
  const [ticket, setTicket] = useState({})
  const [employees, setEmployees] = useState([])
  const { ticketId } = useParams()
  const navigate = useNavigate()

  const fetchTicket = () => {
    getTicketById(ticketId)
      .then((res) => setTicket(res))
  }

  useEffect(
    () => {
      fetchTicket()
    }
    , [])

  useEffect(
    () => {
      getAllEmployees().then((res) => setEmployees(res))
    }
    , [])

  const deleteTicketEvent = () => {
    deleteTicket(ticketId).then(() => navigate("/"))
  }

  const updateTicketEvent = (evt) => {
    const updatedTicket = {
      ...ticket,
      employee: parseInt(evt.target.value)
    }

    updateTicket(updatedTicket).then(() => fetchTicket())
  }
  const ticketCompletedEvent = () => {
    const updatedTicket = {
      ...ticket,
      date_completed: new Date().toISOString().split('T')[0],
      customer: ticket.customer.id,
      employee: ticket.employee.id
    }
    console.log(updatedTicket)
    updateTicket(updatedTicket).then(() => fetchTicket())
  }

  // const ticketStatus = () => {
  //   if (ticket.date_completed === null) {
  //     if (ticket.employee) {
  //       return <span className="status--in-progress">In progress</span>
  //     }
  //     return <span className="status--new">Unclaimed</span>
  //   }
  //   return <span className="status--completed">Done</span>
  // }

  const employeePicker = () => {
    // if (isStaff()) {
    return <div className="ticket__employee">
      <label>Assign to:</label>
      <select
        value={ticket.employee?.id}
        onChange={updateTicketEvent}
        className="assignedTo">
        <option value="0">Choose...</option>
        {
          employees.map(e => <option key={`employee--${e.id}`} value={e.id}>{e.full_name}</option>)
        }
      </select>
    </div>
    // }
    // else {
    // return <div className="ticket__employee">Assigned to {ticket.employee?.full_name ?? "no one"}</div>
    // }
  }

  return (
    <div className="ticketListContainer">
      <h1 className="ticketListHeading">EMPLOYEES</h1>
      <section className="ticket">
        <h2>{ticket.description}</h2>

        <p className=" footerItem">Submitted by {ticket.customer?.full_name}</p>
        <p className="ticket__employee footerItem">
          {
            ticket.date_completed === null
              ? employeePicker()
              : `Completed by ${ticket.employee?.full_name} on ${ticket.date_completed}`
          }
        </p>
        <p className="footerItem">
          {ticketStatus(ticket)}
        </p>
        <div>
          <button onClick={() => ticketCompletedEvent()} className="markCompleted">Mark Completed</button>
          {
            isStaff()
              ? <></>
              : <button className="deleteTicketBtn" onClick={deleteTicketEvent}>Delete</button>
          }
        </div>
      </section>
    </div>
  )
}
