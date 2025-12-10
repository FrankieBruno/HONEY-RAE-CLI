import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
        // Add valid: true for consistency with login
        const authInfo = { ...createdUser, valid: true }
        localStorage.setItem("honeyrae", JSON.stringify(authInfo))
        navigate("/")
      })
      .catch(error => {
        try {
          setFeedback(JSON.parse(error.message).message)
        } catch {
          setFeedback("Registration failed. Please try again.")
        }
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
    <main className="container--register">
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>{serverFeedback}</div>
        <button className="button--close"
          onClick={e => {
            conflictDialog.current.close()
            setFeedback("")
          }}>Close</button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1>Create Your Account</h1>
        <fieldset>
          <label htmlFor="first_name">First Name</label>
          <input onChange={updateCustomer}
            type="text" name="first_name"
            className="form-control"
            placeholder="Enter your first name"
            required autoFocus />
        </fieldset>
        <fieldset>
          <label htmlFor="last_name">Last Name</label>
          <input onChange={updateCustomer}
            type="text" name="last_name"
            className="form-control"
            placeholder="Enter your last name"
            required />
        </fieldset>
        <fieldset>
          <label htmlFor="address">Address</label>
          <input onChange={updateCustomer}
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter your address"
            required />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email Address</label>
          <input onChange={updateCustomer}
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            required />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input onChange={updateCustomer}
            type="password"
            name="password"
            className="form-control"
            placeholder="Create a password"
            required />
        </fieldset>
        <fieldset>
          <button type="submit">Register</button>
        </fieldset>
        <Link className="back-to-login" to="/login">Already have an account? Sign In</Link>
      </form>
    </main>
  )
}

