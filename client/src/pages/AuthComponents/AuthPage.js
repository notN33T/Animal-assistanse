import React, { useContext, useState }            from 'react'
import { AuthContext }                            from '../../context/AuthContext'
import axios                                      from 'axios'
import Flash                                      from '../Common/InfoFlash'
import './css/AuthPage.css'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const [mError, setmError] = useState(undefined)
  const [typeOfForm, setTypeOfForm] = useState('login')
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const loginHandler = async () => {
    try {
      axios.post('http://localhost:5000/api/login', 
      { ...form }, 
      { headers: { 'Authorization': `Bearer ${auth.token}` } })
        .then(response => response.data.map(part => 
          {
          auth.login(part.token, part.isAdmin); 

          if (part.message != undefined) {
            setmError(part.message)
          }
        }))

        .catch(function (error) {
          console.log("on login");
        })

    } catch (e) { console.log("error") }
  }

  const registerHandler = async () => {
    try {
      axios.post('http://localhost:5000/api/register', { ...form })
        .then(response => 
          response.data.map(part => {
          auth.login(part.token, part.isAdmin);

          if (part.message != undefined) {
            setmError(part.message)
          }
        }))

        .catch(function (error) {
          console.log(error);
        });

    } catch (e) { console.log(e) }
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const changeForm = (prop) => {
    setTypeOfForm(prop)
  }

  return (
    <div className="App">
      {mError == undefined ? null : < Flash info={mError} />}
      <div className="logreg-bg"></div>
      <a href="/">
        <h1 className="logreg-logo">Animal Assistance <br /> <span className="logreg-logo-down">save nature togehter</span></h1>
      </a>
      {typeOfForm == 'login' ? <LoginForm form={form} changeHandler={changeHandler} loginHandler={loginHandler} changeForm={changeForm} /> : <RegisterForm form={form} changeHandler={changeHandler} registerHandler={registerHandler} changeForm={changeForm} />}
      <h1 className="logreg-cr"> Created by: <br /> <span className="logreg-cr-down">Ugin PTN</span></h1>
    </div>
  );
}


// Register form component


function RegisterForm({ form, changeHandler, registerHandler, changeForm }) {
  return (
    <div className="logreg-form-container">
        <h1 className="hdn-logo">Animal Assistance 
        <br /> <span className="logreg-logo-down">save nature togehter</span>
        </h1>
      <h1 className="form-header">New on our site?</h1>
      <div className="input-c">
        <input
          placeholder="Input your email"
          value={form.email}
          onChange={changeHandler}
          type="text"
          id="login"
          name="email"
          required />
      </div>
      <div className="input-c">
        <input
          placeholder="Input your password"
          value={form.password}
          onChange={changeHandler}
          type="password"
          id="password"
          name="password"
          required />
          <button
            onClick={registerHandler}
            type="submit"
            id="logreg-form-button"
            className="logreg-form-button"
          >Register</button>
      </div>
      <div className="go-to-else-container">
        <a className="go-to-else"
          onClick={() => changeForm('login')}>Login</a>
      </div>
    </div>
  )
}


// Login form component

function LoginForm({ form, changeHandler, loginHandler, changeForm }) {
  return (
    <div className="logreg-form-container">
        <h1 className="hdn-logo">Animal Assistance 
        <br /> <span className="logreg-logo-down">save nature togehter</span>
        </h1>
      <h1 className="form-header">Welcome back</h1>
      <div className="input-c">
        <input
          placeholder="Input your email"
          type="text"
          id="login"
          name="email"
          value={form.email}
          onChange={changeHandler}
          required />
      </div>
      <div className="input-c">
        <input
          placeholder="Input your password"
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={changeHandler}
          required />
          <button
            onClick={loginHandler}
            id="logreg-form-button"
            className="logreg-form-button"
          >Sign in</button>
      </div>
      <div className="go-to-else-container">
        <a className="go-to-else"
          onClick={() => changeForm('register')}>Register</a>
      </div>
    </div>
  )
}

export default AuthPage;

// useEffect - after full renderring the page
// useState - set defoult state, that saves on react
// useContext - global storage for different varriables