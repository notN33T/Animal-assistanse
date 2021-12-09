import React, {useContext,
    useEffect, useState}                        from 'react'
import Header                                   from '../HomeComponents/Header/Header'
import {AuthContext}                            from '../../context/AuthContext'
import axios                                    from 'axios'
import Flash                                    from '../Common/Flash/InfoFlash'
import './css/profile.css'

export default function ProfilePage() {
    const auth = useContext(AuthContext)
    const [avatar, setAvatar] = useState(null)
    const [newUserName, setNewUserName] = useState('')
    const [info, setInfo] = useState(null)
    const [success, setSuccess] = useState(null)

    const changeHandler = event => {
        if (event.target.name === 'img') return setAvatar(event.target.files[0])
        
        setNewUserName(event.target.value)
    }

    const changeUserName = () => {
        if(newUserName === null 
        || newUserName.length < 7 
        || newUserName.length > 17) {
            setInfo('Incorrect userName')
            setSuccess('error')
            setTimeout(() => {setInfo(null); setSuccess(null)}, 2050)
            return
        }

        const userName = auth.userName
        axios.post('http://localhost:5000/apiposts/change-user-name', { userName, newUserName })
        .then(res => res.data.map(part => {if(part.status==='success'){
            auth.login(auth.token, auth.admin, newUserName, newUserName + '.jpg')
            setInfo(part.message)
            setSuccess(part.status)
            setTimeout(() => {setInfo(null); setSuccess(null)}, 2050)
        } if(part.status==='error'){
            setInfo(part.message)
            setSuccess(part.status)
            setTimeout(() => {setInfo(null); setSuccess(null)}, 2050)
            return
        }}))
    } 

    const changeAvatar = () => {
        if(avatar === null) {
            setInfo('Choose new avatar')
            setSuccess('error')
            setTimeout(() => {setInfo(null); setSuccess(null)}, 2050)
            return
            }
        const formData = new FormData()
        formData.append('img', avatar)
        formData.append('userName', auth.userName)
        axios.post('http://localhost:5000/apiposts/uploadavatar', formData)
            .then(response => response.data.map(part =>{ if(part.message=='success'){
                auth.login(auth.token, auth.admin, auth.userName, auth.userName + '.jpg')
            } }))
    }

    return(
        <>
        <Header/>
        <div className="profile-main-c">

            <div className="profile-img-c">
                <img src={'avatars/' + auth.avatar} alt="" />
            </div>
        
            
            <input
                type="file" 
                name="img" 
                id="input-file" 
                className="input-img"
                onChange={changeHandler}
            />
            <button
                className="prf-btn"
                onClick={changeAvatar}
            >Change avatar</button>

            <p className="profile-user-name">
                {auth.userName}
            </p>
            <div>
                <input 
                    type="text" 
                    className="profile-username-input"
                    value={newUserName} 
                    onChange={changeHandler}
                />
            </div>

            <button
                className="prf-btn"
                onClick={changeUserName}
            >Change username</button>

            
        </div>
        {info!=null ? <Flash info={info} success={success} /> : null}
        </>
    )
}