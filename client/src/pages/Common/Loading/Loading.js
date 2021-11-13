import React from 'react'
import Loadingpng from './media/loading.png'
import './css/loading.css'

export default function Loading() {
    return (
        <div className="loading__container">
            <img src={Loadingpng} alt="Loading..." />
            <h1>Loading<span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span></h1>
        </div>
    )
}