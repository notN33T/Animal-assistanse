import React                from 'react'
import { Link }             from 'react-router-dom'
import './css/Header-a.css'


export default function Header() {
    return(
        <header>
            <div className="admin-hdr">
                <div className="hd-prt-1">
                    <h1> <Link to="/"> Animal Assistance </Link> <span className="pg-inf">create post</span></h1>
                </div>
                <div className="hd-prt-2">
                    <button>Publish</button>
                </div>
            </div>
        </header>
    )
}