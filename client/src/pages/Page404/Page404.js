import React                    from 'react'
import { Link }                 from 'react-router-dom'    
import './css/page404.css'    


export default function Page404() {
    return(
        <div className="pg404__c">
            <div className="text__container">
                <p className="">OOPS! PAGE NOT FOUND</p>
                <p className="error__p">
                    <span className="fist-err__span">4</span>
                    <span className="second-err__span">0</span>
                    <span className="third-err__span">4</span>
                    </p>
                <p className="sorry__p">WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND :(</p>
                <p> <Link to="/" className="back__p">Back to main page</Link> </p>
            </div>
        </div>
    )

}