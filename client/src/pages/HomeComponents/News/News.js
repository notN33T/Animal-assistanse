import React                  from 'react'
import axios                  from 'axios'
import {useState, useEffect, 
    useContext, useCallback}               from 'react'
import { AuthContext }        from '../../../context/AuthContext'
import {Link}                 from 'react-router-dom'
import './css/News.css'

export default function News() {
  const [newPosts, setnewPosts] = useState([])
  const [id, setId] = useState(null)
  const auth = useContext(AuthContext)

  const deletePostHandler = event => {
    const postId = event.target.value
    setId(postId)
    axios.post('http://localhost:5000/apiposts/deletePost', {postId})
    console.log('Id ' + id)
    console.log('Postid ' + postId)
  }

  useEffect(() => {
    axios.get('http://localhost:5000/apiposts/posts')
      .then(response => (setnewPosts(response.data.posts)))
        .catch(e => console.log(e))
  }, [id])

  let gridItem = 1
  const posts = newPosts.map(part =>
      <div key={part.title} className={`post__wrapper grid-item-` + gridItem}>
      <Link to={"/post:" + part.title}>
  
        <div className="post-container" key={part.title} style={{
          backgroundImage: `url(posts-images/${part.img})`
        }}>
            <div className="post-text">
              <p className="post-title">{part.title}</p>
            </div>
        </div>
    </Link>
  
    {auth.admin ? <button 
      className="delete-post-btn"
      value={part._id}
      onClick={deletePostHandler}
    >Delete post</button> : null}
  
    {gridItem++}
    </div>
  
      )

  return (
    <>
      <h1 className="news-title">Latest news</h1>
      <div className="allposts-container">{posts}</div>
    </>
  )
}


