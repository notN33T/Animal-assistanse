import React                                  from 'react'
import logo                                   from '../media/logo.png'
import { AuthContext }                        from '../../../context/AuthContext'
import ButtonDropMenu                         from '../ButtonDropMenu/ButtonDropMenu';
import { Link }                               from "react-router-dom";
import { useCallback, useEffect, 
  useContext, useState }                      from 'react';
function Header() {
  const auth = useContext(AuthContext)
  const logoutHandler = useCallback(() => {
    auth.logout()
  }, [])

  return (
    <header className="hd-home">
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      <ButtonDropMenu />
      <div className="nav-link1">
        <Link to="/" className="nv-btn">Home</Link>
        <Link to="/about" className="nv-btn">About</Link>
        <Link to="" className="nv-btn">Donate</Link>
      </div>
      <div className="nav-link2">
        <Link to="/profile" className="nv-btn">Profile</Link>
        {auth.admin == true ? <Link to="/admin" className="nv-btn">Admin</Link> : null}
        <a
          onClick={logoutHandler}
          className="nv-btn"
          href="/login"
        >Log out</a>
      </div>
    </header>
  )
}

export default Header