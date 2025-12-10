import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isStaff } from "../../utils/isStaff"
import { TicketCard } from "./TicketCard"
import { getAllTickets, searchTicketsByStatus } from "../../managers/TicketManager"
import "./Tickets.css"

export const TicketList = () => {
  const [active, setActive] = useState("")
  const [tickets, setTickets] = useState([])
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState("all")

  useEffect(() => {
    getAllTickets().then((res) => setTickets(res))
  }, [])

  useEffect(() => {
    const activeTicketCount = tickets.filter(t => t.date_completed === null).length
    if (isStaff()) {
      setActive(`There are ${activeTicketCount} open tickets`)
      console.log(active)
    }
    else {
      setActive(`You have ${activeTicketCount} open tickets`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets])

  // const toShowOrNotToShowTheButton = () => {
  //   if (isStaff()) {
  //     return ""
  //   }
  //   else {
  //     return <button className="actions__create"
  //       onClick={() => navigate("/tickets/create")}>Create Ticket</button>
  //   }
  // }

  const filterTickets = (status) => {
    searchTicketsByStatus(status).then((res) => setTickets(res))
  }

  const handleTabChange = (status) => {
    setSelectedTab(status)
    filterTickets(status)
  }

  return (
    <div className="ticketListContainer">
      <h1 className="ticketListHeading">SERVICE TICKETS</h1>

      <div className="tabContainer">
        <button
          className={selectedTab === 'all' ? 'activeTab' : 'inactiveTab'} onClick={() => handleTabChange('all')}
        >
          Show All
        </button>
        <button
          className={selectedTab === 'done' ? 'activeTab' : 'inactiveTab'} onClick={() => handleTabChange('done')}
        >
          Show Done
        </button>
        <button
          className={selectedTab === 'unclaimed' ? 'activeTab' : 'inactiveTab'} onClick={() => handleTabChange('unclaimed')}
        >
          Show Unclaimed
        </button>
        <button
          className={selectedTab === 'inprogress' ? 'activeTab' : 'inactiveTab'} onClick={() => handleTabChange('inprogress')}
        >
          Show In Progress
        </button>
        {
          !isStaff() &&
          <button
            className='addTicketBtn' onClick={() => navigate("/tickets/create")}
          >
            +
          </button>
        }
      </div>

      {/* <div className="actions">{toShowOrNotToShowTheButton()}</div> */}
      {/* <div className="activeTickets">{active}</div> */}
      <article className="tickets">
        {
          tickets.map(ticket => (
            <TicketCard key={`ticket--${ticket.id}`} ticket={ticket} />
          ))
        }
      </article>
    </div>
  )
}







