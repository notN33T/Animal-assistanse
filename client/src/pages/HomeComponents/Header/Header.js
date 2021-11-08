import React                                  from 'react'
import logo                                   from '../media/logo.png'
import { AuthContext }                        from '../../../context/AuthContext'
import ButtonDropMenu                         from '../ButtonDropMenu/ButtonDropMenu';
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
        <a href="/" className="nv-btn">Home</a>
        <a href="" className="nv-btn">About</a>
        <a href="" className="nv-btn">Donate</a>
      </div>
      <div className="nav-link2">
        <a href="/donate" className="nv-btn">Profile</a>
        {console.log(auth.admin)}
        {auth.admin == true ? <a href="/admin" className="nv-btn">Admin</a> : null}
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