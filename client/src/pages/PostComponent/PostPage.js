import React, { useState, useEffect }               from 'react'
import { useParams }                                from 'react-router-dom'
import axios                                        from 'axios'
import Loading                                      from '../Common/Loading/Loading'
import Header                                       from '../HomeComponents/Header/Header'
import Comments                                     from './Comments/Comments'
import './css/post-c.css'
require('dotenv').config()
export default function PostPage() {
    const [post, setPost] = useState(
        { title: '', mainText: ``, img: ''}
    )

    const topicId = useParams().postId

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_DEFAULT_URL}/apiposts/posts${topicId}`)
            .then(result => { setPost({
                img: result.data.postData[0].img, 
                mainText: result.data.postData[0].mainText,
                title: result.data.postData[0].title,
            })
        }).catch(e => console.log(e)) 

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

    return(
        <>
        <Header/>
        <div className="post-page__c">
            {postElement}
        <Comments/>
        </div>
        </>
    )

}
