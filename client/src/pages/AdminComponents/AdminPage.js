import React, { useState }            from 'react'
import axios                          from 'axios'
import Flash                          from '../Common/InfoFlash'
import Header                         from './HeaderAdmin/Header'
import AdminForm                      from './AdminForm/AdminForm'
import './css/Admin.css'

export default function AdminPage() {

    return(
        <div className="adm-pg-c">
            <AdminForm/>
        </div>
    )
}





