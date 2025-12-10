import { isStaff } from "../../utils/isStaff"
import "./Tickets.css"

export const TicketBody = ({ ticket }) => {
  return <div className="ticket__body">
    <i className="ticket__icon">{ticket.emergency ? "🚑" : ""}</i>
    {
      isStaff()
        ? <div className="ticket__customer">Customer: {ticket.customer?.full_name}</div>
        : ""
    }

    <div className="ticket__description">
      {ticket.description}

    </div>
  </div>
}