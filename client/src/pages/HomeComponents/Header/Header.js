import React                                  from 'react'
import logo                                   from '../media/icon.png'
import { AuthContext }                        from '../../../context/AuthContext'
import ButtonDropMenu                         from '../ButtonDropMenu/ButtonDropMenu'
import { Link }                               from 'react-router-dom'
import { useCallback, useContext }            from 'react'

function Header() {
  const auth = useContext(AuthContext)
  const logoutHandler = useCallback(() => {
    auth.logout()
  }, [])

  return (
    <header className="hd-home">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <ButtonDropMenu/>
      <div className="nav-link1">
        <Link to="/" className="nv-btn">Home</Link>
        <Link to="/about" className="nv-btn">About</Link>
        <Link to="/donate" className="nv-btn">Donate</Link>
      </div>
        {auth.isAuthenticated ? 
      <div className="nav-link2">
        <Link to="/profile" className="nv-btn">Profile</Link>
        {auth.admin === true ? <Link to="/admin" className="nv-btn">Admin</Link> : null}
        <Link
          onClick={logoutHandler}
          className="nv-btn"
          to="/auth"
        >Leave</Link>
      </div>
        : 
      <div className="nav-link2">
        <Link to="/auth" className="nv-btn">Sign in</Link>
      </div>
        }

    </header>
  )
}

export default Header