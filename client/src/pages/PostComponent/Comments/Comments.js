import React, { useState, 
    useEffect, useContext, }             from 'react'
import { useParams }                     from 'react-router-dom'
import axios                             from 'axios'
import { AuthContext }                   from '../../../context/AuthContext'
import Loading                           from '../../Common/Loading/Loading'
import Flash                             from '../../Common/Flash/InfoFlash'    
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
        {ready ? <CommentsContainer allcomments={allcomments}/> : null}
        <div>
                <input 
                    type="text"
                    id="text"
                    name="text"
                    value={fcomment.text}
                    onChange={changeHandler}
                />
            </div>
                <button
                    onClick={createHandler}
                    type="submit"
                    id="create__btn"
                    className="create__btn"
                >Send</button>
            </div>
            {info ? <Flash info={info} /> : null }
    </>
    )
    return (<Loading />)
}

function CommentsContainer({allcomments}) {
    let commentId = 1
    return(
        allcomments.map(part => 
        <div className="comment__c" key={commentId}>
                <p>{part.avatar}</p>
                <p>{part.owner}</p>
                <p>{part.text}</p>
                {commentId++}
        </div>
        ))
}    
