import React, {useState}    from 'react'
import { Link }             from 'react-router-dom'
import axios                from 'axios'
import Flash                from '../../Common/Flash/InfoFlash'
import './css/Header-a.css'

export default function Header({form, file}) {
    const [error, setError] = useState(null)
    const postHandler = () => {
        if(!form.title || !form.mainText || !form.img){
            setError("Incorrect data")
            setTimeout(() => {setError(null)}, 2050)
            return
        }
        const formData = new FormData()
        formData.append('img', file)
        axios.post('http://localhost:5000/apiposts/uploadimage',  formData  )
        .then(response => response.data.map(part => console.log(part.message)))

        axios.post('http://localhost:5000/apiposts/createPost',  {...form}  )
        .then(response => response.data.map(part => console.log(part.message)))

    }
    return(
        <header>
            {error ? <Flash info={error}/> : null}
            <div className="admin-hdr">
                <div className="hd-prt-1">
                    <h1> <Link to="/">Animal Assistance<span className="anim_span">_</span></Link> <span className="pg-inf">create post</span></h1>
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