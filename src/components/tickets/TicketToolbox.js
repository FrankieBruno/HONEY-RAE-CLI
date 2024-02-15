export const ticketStatus = (ticket) => {
    if (ticket.date_completed === null) {
      if (ticket.employee) {
        return <span className="status--in-progress">In progress</span>;
      }
      return <span className="status--new">Unclaimed</span>;
    }
    return <span className="status--completed">Done</span>;
  };