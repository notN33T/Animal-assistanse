import React from 'react'
import './css/Footer.css'
import telegram from "./media/telegram.png"
import vk from "./media/vk.png"
import facebook from "./media/facebook.png"

export default function Footer() {
  return (
    <footer>
      <div className="footer-c">
        <div className="foooter-icons">
          <a href="" className="footer-a">
            <img src={telegram} alt="telegram" />
          </a>
          <a href="" className="footer-a">
            <img src={vk} alt="vk" />
          </a>
          <a href="" className="footer-a">
            <img src={facebook} alt="facebook" />
          </a>
        </div>
        <div className="foooter-spans">
          <span className="footer-info"></span>
          <span className="footer-copy-right">
            <p className="footer-cr-txt">
              2021 © Animal-Assistance.by
            </p>
            <p className="footer-cr-txt">
              Copying content and posting to other sites is prohibited.
            </p>
          </span>
        </div>
      </div>
    </footer>
  )
}