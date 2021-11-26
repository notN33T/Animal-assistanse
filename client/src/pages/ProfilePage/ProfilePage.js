import React, {useContext,
    useEffect, useState}                        from 'react'
import Header                                   from '../HomeComponents/Header/Header'
import {AuthContext}                            from '../../context/AuthContext'
import axios                                    from 'axios'
import './css/profile.css'

export default function ProfilePage() {
    const auth = useContext(AuthContext)
    const [avatar, setAvatar] = useState(null)
    const [newUserName, setNewUserName] = useState('')

    const changeHandler = event => {
        if (event.target.name === 'img') {
            setAvatar(event.target.files[0])
        }
        setNewUserName(event.target.value)
    }

    const changeUserName = () => {
        const userName = auth.userName
        axios.post('http://localhost:5000/apiposts/change-user-name', { userName, newUserName })
        .then(res => res.data.map(part => {if(part.message=='success'){
            auth.login(auth.token, auth.isAdmin, newUserName, auth.avatar)
        }}))
    } 

    const changeAvatar = () => {
        const formData = new FormData()
        formData.append('img', avatar)
        formData.append('userName', auth.userName)
        axios.post('http://localhost:5000/apiposts/uploadavatar', formData)
            .then(response => response.data.map(part =>{ if(part.message=='success'){
                auth.login(auth.token, auth.isAdmin, auth.userName, auth.userName + '.jpg')
            } }))
    }

    return(
        <>
        <Header/>
        <div className="profile-main-c">
            <p className="profile-user-name">
                {auth.userName}
            </p>
            <div>
                <input 
                    type="text" 
                    value={newUserName} 
                    onChange={changeHandler}
                />
            </div>

            <button
            onClick={changeUserName}
            >Change username</button>

            <img src={'avatars/' + auth.avatar} alt="" />
            
            <input
                type="file" 
                name="img" 
                id="input-file" 
                className="input-img"
                onChange={changeHandler}
            />
            <button
            onClick={changeAvatar}
            >Change avatar</button>
        </div>
        </>
    )
}