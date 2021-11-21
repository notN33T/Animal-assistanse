import React                        from 'react'
import Header from '../HomeComponents/Header/Header'
import './css/about.css'
export default function AboutPage() {
    return(
        <>
        <Header />
        <div className="logo-c">
            <h1>About animal assistance</h1>

        </div>
        <div className="main-c">
            <h1 className="about-h1-1">Who we are</h1>
            <p className="about-p-1">
                We are a group of volunteers from Belarus, the purpose of which 
                is to provide assistance to various organizations involved in helping animals. 
                We have been organizing help since 2020. Our main partner is WWF.
            </p>
            <h1 className="about-h1-2">How can you help us?</h1>
            <p className="about-p-2">
                We are a charity and don't need money, 
                instead you can help our partners, links to whom you can find in the tab "Donate".
            </p>
        </div>
        </>
    )
}