import { getToken } from "../utils/getToken"


export const getEmployeeById = (id) => {
  return fetch(`https://honey-rae-26f1b4aa2689.herokuapp.com/employees/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}

export const deleteEmployeeById = (id) => {
  return fetch(`https://honey-rae-26f1b4aa2689.herokuapp.com/employees/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
}

export const addEmployee = (employee) => {
  return fetch(`https://honey-rae-26f1b4aa2689.herokuapp.com/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`
    },
    body: JSON.stringify(employee)
  })
    .then(res => res.json())
}

export const updateEmployee = (id, employee) => {
  return fetch(`https://honey-rae-26f1b4aa2689.herokuapp.com/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`
    },
    body: JSON.stringify(employee)
  })
    .then(res => res.json())
}

export const getAllEmployees = () => {
  return fetch(`https://honey-rae-26f1b4aa2689.herokuapp.com/employees`, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}

