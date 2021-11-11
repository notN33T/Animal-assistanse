import React, {useEffect, useState}          from 'react'
import './info-flash.css'

export default function InfoFlash({info}) {
  const [err, setErr] = useState(null)
  useEffect(() => {
    setErr(info)
    document.getElementById('flash').style.opacity = "1"
    document.getElementById('flash').style.transition = "0.5s"
    setTimeout(() => {
      try {
        document.getElementById('flash')
        document.getElementById('flash').style.opacity = "0"
        setErr(null) 
      } catch {
        console.log("User spamming")
      }

    }, 3000)
  },
  [])
  return (
    <div className="flash-con" id="flash">
      <p className="flash-info">{err}</p>
    </div>
  )
}