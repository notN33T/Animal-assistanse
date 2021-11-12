import React                from 'react'
import { Link }             from 'react-router-dom'
import axios                from 'axios'
import './css/Header-a.css'

export default function Header({form, file}) {
    const postHandler = () => {
        
        const formData = new FormData()
        formData.append('img', file)
        axios.post('http://localhost:5000/apiposts/uploadimage',  formData  )
        .then(response => response.data.map(part => console.log(part.message)))

        axios.post('http://localhost:5000/apiposts/createPost',  {...form}  )
        .then(response => response.data.map(part => console.log(part.message)))

    }
    return(
        <header>
            <div className="admin-hdr">
                <div className="hd-prt-1">
                    <h1> <Link to="/"> Animal Assistance </Link> <span className="pg-inf">create post</span></h1>
                </div>
                <div className="hd-prt-2">
                    <button
                        onClick={postHandler}
                    >Publish</button>
                </div>
            </div>
        </header>
    )
}