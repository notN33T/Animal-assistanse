import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const ButtonDropMenu = () => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  if (dropdownOpen) {
    return (
      <div className="btn-drp-men active" >
        <button onClick={toggle}>
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <a href="/" className="men-btn">Home</a>
        <a href="/about" className="men-btn">About</a>
        <a href="/donate" className="men-btn">Donate</a>
        <a href="/profile" className="men-btn">Profile</a>
        <a href="/logout" className="men-btn">Leave</a>
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