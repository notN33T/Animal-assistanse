import React, {useState, useContext}    from 'react'
import { Link }                         from 'react-router-dom'
import axios                            from 'axios'
import Flash                            from '../../Common/Flash/InfoFlash'
import './css/Header-a.css'

export default function Header({form, file}) {
    const [info, setInfo] = useState(null)
    const [success, setSuccess] = useState(null)
    const postHandler = () => {
        if(form.title.length < 5 || form.title.length > 30 
            || form.mainText.length < 50
            || !form.img){
            setInfo('Incorrect data')
            setSuccess('error')
            setTimeout(() => {setInfo(null); setSuccess(null)}, 2050)
            return
        }
        const formData = new FormData()
        formData.append('img', file)
        axios.post('http://localhost:5000/apiposts/uploadimage',  formData )
        .then(response => response.data.map(part => {setInfo(part.message); setSuccess(part.status)}))

        axios.post('http://localhost:5000/apiposts/createPost',  {...form}  )
        .then(response => response.data.map(part => {setInfo(part.message); setSuccess(part.status)}))
    }
    const flashElement = <Flash info={info} success={success}/>

    return(
        <header>
            {info ? flashElement : null}
            <div className='admin-hdr'>
                <div className='hd-prt-1'>
                    <h1> <Link to='/'>Animal Assistance<span className='anim_span'>_</span></Link> <span className='pg-inf'>create post</span></h1>
                </div>
                <div className='hd-prt-2'>
                    <button
                        onClick={postHandler}
                    >Publish</button>
                </div>
            </div>
        </header>
    )
}