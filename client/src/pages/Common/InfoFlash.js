import React from 'react'
import './info-flash.css'

export default function InfoFlash({info}) {
  return (
    <div className="flash-con">
      <p className="flash-info">{info}!</p>
    </div>
  )
}