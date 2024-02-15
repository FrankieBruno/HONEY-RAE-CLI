import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Auth.css"
import { registerUser } from "../../managers/AuthManager";

export const EmployeeRegister = (props) => {
  const [employee, setEmployee] = useState({ "account_type": "employee" })
  const [serverFeedback, setFeedback] = useState("")
  const conflictDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    registerUser(employee)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        }
        return res.json().then((json) => {
          throw new Error(JSON.stringify(json))
        });
      })
      .then(createdUser => {
        localStorage.setItem("honeyrae", JSON.stringify(createdUser))
        navigate("/")
      })
      .catch(error => {
        setFeedback(JSON.parse(error.message).message)
      })
  }

  useEffect(() => {
    if (serverFeedback !== "") {
      conflictDialog.current.showModal()
    }
  }, [serverFeedback])

  const updateEmployee = (evt) => {
    const copy = { ...employee }
    copy[evt.target.name] = evt.target.value
    setEmployee(copy)
  }


  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>{serverFeedback}</div>
        <button className="button--close"
          onClick={e => conflictDialog.current.close()}>Close</button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Welcome to the team</h1>
        <fieldset>
          <label htmlFor="first_name"> First Name </label>
          <input onChange={updateEmployee}
            type="text" name="first_name" className="form-control"
            placeholder="Enter your first name" required autoFocus />
        </fieldset>
        <fieldset>
          <label htmlFor="last_name"> Last Name </label>
          <input onChange={updateEmployee}
            type="text" name="last_name" className="form-control"
            placeholder="Enter your last name" required />
        </fieldset>
        <fieldset>
          <label htmlFor="specialty"> Specialty </label>
          <input onChange={updateEmployee}
            type="text"
            name="specialty"
            className="form-control"
            placeholder="Tech specialty" required />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input onChange={updateEmployee}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address" required />
        </fieldset>
        <fieldset>
          <label htmlFor="password"> Password </label>
          <input onChange={updateEmployee}
            type="password"
            name="password"
            className="form-control" required />
        </fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  )
}

