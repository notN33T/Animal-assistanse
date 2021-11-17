import React, { useState, 
    useEffect, useContext, }             from 'react'
import { useParams }                     from 'react-router-dom'
import axios                             from 'axios'
import { AuthContext }                   from '../../../context/AuthContext'
import Flash                             from '../../Common/Flash/InfoFlash'    
import moment                            from 'moment'
import './css/comments.css'

export default function Comments() {
    const auth = useContext(AuthContext)
    const [allcomments, setAllComments] = useState([])
    const [info, setInfo] = useState(null)
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
            setTimeout(() => { setInfo(null) }, 2050)
            return
        }
        if((fcomment.text).length > 200) {
            setInfo("Your comment to big")
            setTimeout(() => { setInfo(null) }, 2050)
            return
        }
        axios.post('http://localhost:5000/apiposts/create-comment', {fcomment, title})
            .then(response => response.data.map(part => {
                if(part.message != 'undefined') {
                    setInfo(part.message)
                    setTimeout(() => { setInfo(null) }, 2050)
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
                setTimeout(() => { setInfo(null) }, 2050)
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
        <CreateContainer 
        createHandler={createHandler} 
        changeHandler={changeHandler} 
        fcomment={fcomment}
        />
        <CommentsContainer allcomments={allcomments} deleteHandler={deleteHandler}/>
    </div>
        {info ? <Flash info={info} /> : null }
    </>
    )
}

function CommentsContainer({allcomments, deleteHandler}) {
    const [commments, setComments] = useState(allcomments)
    useEffect(() => {
        setComments(allcomments.reverse())
    }, [allcomments])

    return(
        commments.map(part => 
        <div className="single-comment-c" key={part.text + part.owner}>
            <div className="comment-img-c">
                <p className="comment-avatar"><img src={`avatars/${part.avatar}`}/></p>
            </div>
            <div className="comment-data-c">
                <h1 className={`comment-owner ${part.admin ? 'admin-st' : null}`}>
                    {part.owner} 
                    <span className="comment-date-sp"> 
                    <p className="comment-date">    
                        {moment(part.date).fromNow()}
                    </p>
                    </span>
                </h1>
                <p className="comment-text">{part.text}</p>
              
            </div>
              <button onClick={deleteHandler} value={part._id} className="com-del-bn"></button>
              <button onClick={deleteHandler} value={part.text} className="com-edit-bn"></button>
        </div>
        ))
}    

function CreateContainer({ createHandler, changeHandler, fcomment }) {
    return (
    <div className="leave-comment-form">
        <textarea 
            type="text"
            id="leave-comment-ta"
            name="text"
            placeholder="Type your comment there"
            className="leave-comment-ta"
            value={fcomment.text}
            onChange={changeHandler}
        />
        <button
            onClick={createHandler}
            type="submit"
            id="create-btn"
            className="creat-btn">
            Send
        </button>
    </div>
    )
}