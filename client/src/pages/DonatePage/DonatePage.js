import React                     from 'react'
import Header                    from '../HomeComponents/Header/Header'
import './css/donate.css'

export default function DonatePage() {
    return(
        <>
        <Header/>
        <div className="pg-hdr-c">
            <div className="donate-bg">
                <h1 className="first-dnt-txt">You decision will change the planet</h1>
            </div>
        </div>

        <div className="donate-text-c">
            <h1 className="main-c-h1">Why your donation matters.</h1>
            <p className="main-c-p">
            Animal Care Organizations are 100% funded by the community. We rely on community donations to provide:
            <br /><br />
            A planet-wide educational program, working with selected partners to educate the global community about the benefits of helping animals.
            <br /><br />    
            Awareness to help address the animal extinction crisis, and collaboration and cooperation with volunteer organizations to support and treat animals
            Advocating and lobbying for government support to raise awareness of illegal killings and other actions against animals
            All donations are made to the sites listed below, this is completely secure
            <br /><br />
            On behalf of our website, we thank you for your support.
            </p>
            <div className="donations-c">
            <a className="donate-ref" href="https://support.worldwildlife.org/site/Donation2?df_id=16636&16636.donation=form1&s_src=AWE2205OQ18299A05803CX&_ga=2.115720130.533072170.1637526659-386927805.1635959062">WWF</a>
            <a href="https://secure.worldanimalprotection.org.uk/get-involved/donate/~my-donation?_ga=2.230893015.970749298.1637526803-707131055.1637526803" className="donate-ref">WAP</a>
            <a href="https://act.greenpeace.org/page/33188/donate/1?_ga=2.57239336.388190751.1637526881-159435534.1637526881" className="donate-ref">Green Peace</a>
        </div>
        </div>
        </>
    )
}