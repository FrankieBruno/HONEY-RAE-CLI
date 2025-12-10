import { useEffect, useState } from "react"
import { getAllCustomers } from "../../managers/CustomerManager"

export const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [totalCustomerMessage, updateMessage] = useState("")

  useEffect(
    () => {
      getAllCustomers()
        .then((res) => setCustomers(res))

    }, []
  )

  useEffect(
    () => {
      if (customers.length === 1) {
        updateMessage("You have 1 customer")
      }
      else {
        updateMessage(`You have ${customers.length} customers`)
      }
    },
    [customers]
  )

  return (
    <>
      <h2>Customer List</h2>
      <div>{totalCustomerMessage}</div>
      {
        customers.map(
          (customerObject) => {
            return <p key={`customer--${customerObject.id}`}>{customerObject.full_name}</p>
          }
        )
      }
    </>
  )
}
