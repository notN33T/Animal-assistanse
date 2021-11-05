import React from 'react'
import './css/Goals.css'
import france from "./media/france.png"
import germany from "./media/germany.png"
import poland from "./media/poland.png"
import spain from "./media/spain.png"
import switzerland from "./media/switzerland.png"
import united_kingdom from "./media/united-kingdom.png"

export default function Goals() {
  return (
    <div className="goals-с">
      <span className="goals-txt">
        Our goals
      </span>
      <span className="goals-sl">
        Our goal is to keep nature in its original form
      </span>
      <span className="org-inf-txt">We organize our work in these countries:</span>
      <Countries />
    </div>
  )
}

function Countries() {
  return (
    <div className="countries-c">
      <a href="#">
        <div className="country">
          <img src={france} alt="france" />
          <span className="county-txt">France</span>
        </div>
      </a>
      <a href="#">
        <div className="country">
          <img src={germany} alt="germany" />
          <span className="county-txt">Germany</span>
        </div>
      </a>
      <a href="#">
        <div className="country">
          <img src={poland} alt="poland" />
          <span className="county-txt">Poland</span>
        </div>
      </a>
      <a href="#">
        <div className="country">
          <img src={spain} alt="spain" />
          <span className="county-txt">Spain</span>

        </div>
      </a>
      <a href="#">
        <div className="country">
          <img src={switzerland} alt="switzerland" />
          <span className="county-txt">Switzerland</span>
        </div>
      </a>
      <a href="#">
        <div className="country">
          <img src={united_kingdom} alt="united-kingdom" />
          <span className="county-txt">UK</span>
        </div>
      </a>
    </div>
  )
}