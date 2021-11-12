import React                from 'react'
import './css/Header-a.css'


export default function Header() {
    return(
        <header>
            <div className="admin-hdr">
                <div className="hd-prt-1">
                    <h1>Animal Assistance <span className="pg-inf">create post</span></h1>
                </div>
                <div className="hd-prt-2">
                    <button>Publish</button>
                </div>
            </div>
        </header>
    )
}