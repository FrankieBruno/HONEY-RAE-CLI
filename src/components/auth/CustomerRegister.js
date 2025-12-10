import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Auth.css"
import { registerUser } from "../../managers/AuthManager";

export const Register = () => {
  const [customer, setCustomer] = useState({ "account_type": "customer" })
  const [serverFeedback, setFeedback] = useState("")
  const conflictDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    registerUser(customer)
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

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy[evt.target.name] = evt.target.value
    setCustomer(copy)
  }


  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>{serverFeedback}</div>
        <button className="button--close"
          onClick={e => {
            conflictDialog.current.close()
            setFeedback("")
          }}>Close</button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register New Account</h1>
        <fieldset>
          <label htmlFor="first_name"> First Name </label>
          <input onChange={updateCustomer}
            type="text" name="first_name"
            className="form-control" required autoFocus />
        </fieldset>
        <fieldset>
          <label htmlFor="last_name"> Last Name </label>
          <input onChange={updateCustomer}
            type="text" name="last_name"
            className="form-control" required />
        </fieldset>
        <fieldset>
          <label htmlFor="address"> Address </label>
          <input onChange={updateCustomer}
            type="text"
            name="address"
            className="form-control" required />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input onChange={updateCustomer}
            type="email"
            name="email"
            className="form-control" required />
        </fieldset>
        <fieldset>
          <label htmlFor="password"> Password </label>
          <input onChange={updateCustomer}
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

