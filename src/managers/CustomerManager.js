import { getToken } from "../utils/getToken"

export const getAllCustomers = () => {
  return fetch("https://honey-rae-26f1b4aa2689.herokuapp.com/customers", {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}

