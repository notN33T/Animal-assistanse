import React, { useState }      from 'react'
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome'
import { faListUl }             from '@fortawesome/free-solid-svg-icons'
import { Link }                   from 'react-router-dom'

const ButtonDropMenu = () => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  if (dropdownOpen) {
    return (
      <div className="btn-drp-men active" >
        <button onClick={toggle}>
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <Link to="/" className="men-btn">Home</Link>
        <Link to="/about" className="men-btn">About</Link>
        <Link to="/donate" className="men-btn">Donate</Link>
        <Link to="/profile" className="men-btn">Profile</Link>
        <Link to="/logout" className="men-btn">Leave</Link>
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