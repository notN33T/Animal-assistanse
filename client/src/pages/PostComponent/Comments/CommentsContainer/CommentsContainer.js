import {useState, useEffect} from 'react'
import SingleComment         from '../SingleComment/SingleComment'

export default function CommentsContainer({allcomments, deleteHandler, auth, title}) {
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
