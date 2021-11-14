import React, {useState, useEffect, useCallback}    from 'react'
import { useParams }                                from 'react-router-dom'
import axios                                        from 'axios'
import Loading                                      from '../Common/Loading/Loading'
import Header                                       from '../HomeComponents/Header/Header'
import './css/post-c.css'

export default function PostPage() {
    const [ready, setReady] = useState(false)
    const [post, setPost] = useState(
        {title: '', mainText: ``, img: ''}
    )

    const topicId = useParams().postId

    useEffect(() => {
        setReady(false)

        axios.get(`http://localhost:5000/apiposts/posts${topicId}`)
            .then(result => {console.log(result.data.postData[0].img); setPost({
                img: result.data.postData[0].img, 
                mainText: result.data.postData[0].mainText,
                title: result.data.postData[0].title    
            }) })
                .catch(e => console.log(e)) 
        setReady(true)
    }, [])

    const postElement = 
    <>
        <div className="post-img__c">
            <img src={`posts-images/${post.img}`}/>
        </div>

        <div className="post-title__c">
            {post.title}
        </div>

        <div className="post-main-text__c">
            <p>
                {post.mainText.replace(/\n/g, '\n\n')}
            </p>
        </div>
    </>

    if(ready) {
        return(
            <>
            <Header/>
            <div className="post-page__c">
                {postElement}
            </div>
            </>
        )
    }
    return <Loading />

}
