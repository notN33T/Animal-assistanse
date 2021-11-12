import React, {useEffect, useState}          from 'react'
import './info-flash.css'

export default function InfoFlash({info}) {
  useEffect(() => {
    document.getElementById('flash').style.opacity = "1"
    document.getElementById('flash').style.transition = "0.5s"
    setTimeout(() => {
      try {
        document.getElementById('flash')
        document.getElementById('flash').style.opacity = "0"
      } catch {
        console.log("User spamming")
      }

    }, 2000)
  },
  [])
  return (
    <div className="flash-con" id="flash">
      <p className="flash-info">{info}</p>
    </div>
  )
}