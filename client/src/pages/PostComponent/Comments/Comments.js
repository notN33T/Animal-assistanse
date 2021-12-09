import React, { useState, 
    useEffect, useContext, }             from 'react'
import { useParams }                     from 'react-router-dom'
import axios                             from 'axios'
import { AuthContext }                   from '../../../context/AuthContext'
import Flash                             from '../../Common/Flash/InfoFlash'    
import CommentsContainer                 from './CommentsContainer/CommentsContainer'
import CreateContainer                   from './CreateContainer/CreateContainer'
import './css/comments.css'

export default function Comments() {
    const auth = useContext(AuthContext)
    const [allcomments, setAllComments] = useState([])
    const [info, setInfo] = useState(null)
    const [success, setSuccess] = useState(null)
    const [fcomment, setFComment] = useState({
        text: '',
        owner: auth.userName,
        avatar: auth.avatar,
        admin: auth.admin,
    })

    const topicId = useParams().postId
    let title = topicId.replace(/'%'/g, ' ')
    title = title.replace('s:', '')
    title = title.replace(':', '')

    useEffect(() => {
        axios.get(`http://localhost:5000/apiposts/posts${topicId}`)
            .then(result => {setAllComments(result.data.postData[0].comments)})
                .catch(e => console.log(e))
    }, [allcomments])
    
    const createHandler = () => {
        if((fcomment.text).length < 5) {
            setInfo("Your comment to short")
            setSuccess('error')
            setTimeout(() => { setInfo(null); setSuccess(null) }, 2050)
            return
        }
        if((fcomment.text).length > 200) {
            setInfo("Your comment to big")
            setSuccess('error')
            setTimeout(() => { setInfo(null); setSuccess(null) }, 2050)
            return
        }
        axios.post('http://localhost:5000/apiposts/create-comment', {fcomment, title})
            .then(response => response.data.map(part => {
                if(part.message != 'undefined') {
                    setInfo(part.message)
                    setSuccess(part.status)
                    setTimeout(() => { setInfo(null); setSuccess(null) }, 2050)
                    return
                }
                setAllComments([...allcomments, fcomment])
            }))
            setFComment({...fcomment, text: ''})
            
    }

    const deleteHandler = event => {
        console.log(event.target.value)
        const id = event.target.value
        axios.post('http://localhost:5000/apiposts/delete-comment', {id, title})
        .then(response => response.data.map(part => {
            if(part.message != 'undefined') {
                setInfo(part.message)
                setSuccess(part.status)
                setTimeout(() => { setInfo(null); setSuccess(null) }, 2050)
                return
            }
            setAllComments({ allcomments })
        }))
    }

    const changeHandler = event => {
        setFComment({...fcomment, [event.target.name]: event.target.value})
    }

    return(
    <>
    <div className="comments__c">

        {auth.isAuthenticated ?
        <CreateContainer 
            createHandler={createHandler} 
            changeHandler={changeHandler} 
            fcomment={fcomment}/>: null}

        <CommentsContainer 
            allcomments={allcomments} 
            deleteHandler={deleteHandler} 
            auth={auth}
            title={title}/>

    </div>
    {info ? <Flash info={info} success={success} /> : null }
    </>
    )
}