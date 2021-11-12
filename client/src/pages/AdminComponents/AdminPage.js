import React, { useState }            from 'react'
import axios                          from 'axios'
import Flash                          from '../Common/InfoFlash'
import Header                         from './HeaderAdmin/Header'
import './css/Admin.css'

export default function AdminPage() {
    const [mError, setmError] = useState(undefined)
    

    return(
        <div className="adm-pg-c"><Header/></div>
    )
}





