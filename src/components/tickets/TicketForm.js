import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addTicket } from "../../managers/TicketManager"

export const TicketForm = () => {
  const [ticket, setTicket] = useState({
    description: "",
    emergency: false
  })

  const navigate = useNavigate()

  const submitTicket = (evt) => {
    evt.preventDefault()

    addTicket(ticket)
      .then(() => navigate("/"))
  }

  return (
    <div className="ticketListContainer">
      <form className="ticketForm">
        <h2 className="ticketForm__title">New Service Ticket</h2>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            onChange={
              (evt) => {
                const copy = { ...ticket }
                copy.description = evt.target.value
                setTicket(copy)
              }
            }
            required autoFocus
            type="text" id="description"
            className="form-control"
            placeholder="Brief description of problem"
          />
        </div>
        {/* <div className="form-group">
            <label htmlFor="name">Emergency:</label>
            <input
              onChange={
                (evt) => {
                  const copy = { ...ticket }
                  copy.emergency = evt.target.checked
                  setTicket(copy)
                }
              }
              type="checkbox" />
          </div> */}
        <button onClick={submitTicket} className="btn btn-primary">
          Submit Ticket
        </button>
      </form>
    </div>
  )
}