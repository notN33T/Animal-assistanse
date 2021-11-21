import React, {useState}          from 'react'
import axios                      from 'axios'
import Flash                      from '../../../Common/Flash/InfoFlash'    
import moment                     from 'moment'


export default function SingleComment({part, deleteHandler, auth, title}) {    
    const [edit, setEdit] = useState(false)
    const [editedText, setEditedText] = useState('')
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
        editHandler()
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
                : <button onClick={sendEditHandler} className="edit-send-btn">Edit</button> }

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