import React, { useState, useContext, useCallback }       from 'react'
import { FontAwesomeIcon }                                from '@fortawesome/react-fontawesome'
import { faListUl }                                       from '@fortawesome/free-solid-svg-icons'
import { AuthContext }                                    from '../../../context/AuthContext'
import { Link }                                           from 'react-router-dom'

const ButtonDropMenu = () => {
  const [dropdownOpen, setOpen] = useState(false);
  const auth = useContext(AuthContext)
  const toggle = () => setOpen(!dropdownOpen);
  const logoutHandler = useCallback(() => {
    auth.logout()
  }, [])

  if (dropdownOpen) {
    return (
      <div className="btn-drp-men active" >
        <button onClick={toggle}>
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <Link to="/" className="men-btn">Home</Link>
        <Link to="/about" className="men-btn">About</Link>
        <Link to="/donate" className="men-btn">Donate</Link>
        {auth.isAuthenticated ?
        <> <Link to="/profile" className="men-btn">Profile</Link> 
            {auth.admin ? <Link to="/admin" className="men-btn">Admin</Link>: null}
            <Link 
            onClick={logoutHandler}
            to="/auth"
            className="men-btn">Leave</Link>
        </> 
        :<Link to="/auth" className="men-btn">Sign in</Link>}
        
        
        
      </div>
    )
  }
  return (
    <div className="btn-drp-men">
      <button onClick={toggle}>
        <FontAwesomeIcon icon={faListUl} />
      </button>
    </div>
  )
}

export default ButtonDropMenu