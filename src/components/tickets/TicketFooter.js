import { ticketStatus } from "./TicketStatus"
import "./Tickets.css"

export const TicketFooter = ({ ticket }) => {


  return <footer className="ticket__footer">
    <div className="ticket__employee">
      {
        ticket.date_completed === null
          ? `Assigned to ${ticket?.employee?.full_name ?? "no one, yet"}`
          : `Completed by ${ticket?.employee?.full_name} on ${ticket.date_completed}`
      }
    </div>
    <div> {ticketStatus(ticket)} </div>
  </footer>
}