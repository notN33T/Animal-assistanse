import React, { useState, 
    useEffect, useContext, }             from 'react'
import { useParams }                     from 'react-router-dom'
import axios                             from 'axios'
import { AuthContext }                   from '../../../context/AuthContext'
import Loading                           from '../../Common/Loading/Loading'
import Flash                             from '../../Common/Flash/InfoFlash'    
import moment                            from 'moment'
import './css/comments.css'

export default function Comments() {
    const auth = useContext(AuthContext)
    const [allcomments, setAllComments] = useState([])
    const [ready, setReady] = useState(false)
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
        setReady(true)
    }, [allcomments])
    
    const createHandler = () => {
        setReady(false)
        axios.post('http://localhost:5000/apiposts/create-comment', {fcomment, title})
            .then(response => response.data.map(part => {
                if(part.message != 'undefined') {
                    setInfo(part.message)
                    setTimeout(() => { setInfo(null) }, 2050)
                    return
                }
                setAllComments([...allcomments, fcomment])
            }))
    }

    const changeHandler = event => {
        setFComment({...fcomment, [event.target.name]: event.target.value})
    }

    if(ready) return(
    <>
    <div className="comments__c">
        <CreateContainer 
        createHandler={createHandler} 
        changeHandler={changeHandler} 
        fcomment={fcomment}
        />
        {ready ? <CommentsContainer allcomments={allcomments}/> : null}
    </div>
        {info ? <Flash info={info} /> : null }
    </>
    )
    return (<Loading />)
}

function CommentsContainer({allcomments}) {
    const [commments, setComments] = useState(allcomments)
    useEffect(() => {
        setComments(allcomments.reverse())
    }, [allcomments])

    return(
        commments.map(part => 
        <div className="single-comment-c" key={part.text}>
            <div className="comment-img-c">
                <p className="comment-avatar"><img src={`avatars/${part.avatar}`}/></p>
            </div>
            <div className="comment-data-c">
                <p className={`comment-owner ${part.admin ? 'admin-st' : null}`}>
                    {part.owner} 
                    <span className="comment-date-sp"> 
                    <p className="comment-date">    
                        {moment(part.date).fromNow()}
                    </p>
                    </span>
                </p>
                <p className="comment-text">{part.text}</p>
              
            </div>
              
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