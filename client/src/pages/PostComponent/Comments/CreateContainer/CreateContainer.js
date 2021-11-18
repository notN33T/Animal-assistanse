import React from 'react'

export default function CreateContainer({ createHandler, changeHandler, fcomment }) {
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