import React, {useEffect}     from 'react'
import './info-flash.css'

export default function InfoFlash({info, success}) {
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

  if(success == 'success') {
  return(
    <div className="flash-con success" id="flash">
      <p className="flash-info">{info}</p>
    </div>
  )
    
  }
  return (
    <div className="flash-con" id="flash">
      <p className="flash-info">{info}</p>
    </div>
  )
}