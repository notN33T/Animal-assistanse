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

        <CommentsContainer 
            allcomments={allcomments} 
            deleteHandler={deleteHandler} 
            auth={auth}
            title={title}
        />

    </div>
        {info ? <Flash info={info} /> : null }
    </>
    )
}

function CommentsContainer({allcomments, deleteHandler, auth, title}) {
    const [commments, setComments] = useState(allcomments)

    useEffect(() => {
        setComments(allcomments.reverse())
    }, [allcomments])

    const singleComment = commments.map(part => 
        <SingleComment 
            part={part} 
            deleteHandler={deleteHandler} 
            auth={auth} 
            title={title}
        />
        )
    return(
        <>
            {singleComment}
        </>
    )
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

function SingleComment({part, deleteHandler, auth, title}) {    
    const [edit, setEdit] = useState(false)
    const [editedText, setEditedText] = useState(part.text)
    const [info, setInfo] = useState(null)
    const text = part.text
    const owner = part.owner
    const editHandler = event => {
        edit ? setEdit(false) : setEdit(true)
    }
    const changeHandler = event => {
        setEditedText(event.target.value)
    }
    const sendEditHandler = () => { 
        axios.post('http://localhost:5000/apiposts/edit-comment', {editedText, text, owner, title})
        .then(response => response.data.map(part => {
            if(part.message != 'undefined') {
                setInfo(part.message)
                setTimeout(() => { setInfo(null) }, 2050)
                return
            }
        }))
    }
    
    return (
        <>
        <div className="single-comment-c" key={text + part.owner}>
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

                {!edit ? <p className="comment-text">{text}</p> 
                :<textarea 
                    type="text" 
                    className="comment-text-edit" 
                    onChange={changeHandler}
                    autoFocus 
                    value={editedText}
                />}
                 {!edit ? null
                : <button onClick={sendEditHandler} className="edin-send-btn">Edit</button> }

                <div className="edit-btns">
                    {part.owner == auth.userName
                    ? <button onClick={deleteHandler} value={part._id} className="com-del-bn">Delete</button>
                    : auth.admin 
                    ? <button onClick={deleteHandler} value={part._id} className="com-del-bn">Delete</button>
                    : null}

                    {part.owner == auth.userName
                    ?  <button onClick={editHandler}>{!edit ? 'Edit' : 'Stop editing'}</button>
                    : auth.admin 
                    ?  <button onClick={editHandler}>{!edit ? 'Edit' : 'Stop editing'}</button>
                    : null}
                </div>

            </div>
        </div>
            {info ? <Flash info={info} /> : null }
        </>
    )

}