import React                  from 'react'
import axios                  from 'axios'
import {useState, useEffect}  from 'react'
import {Link}                 from 'react-router-dom'
import './css/News.css'

export default function News() {
  const [newPosts, setnewPosts] = useState([])

  useEffect(() => {
  axios.get('http://localhost:5000/apiposts/posts')
    .then(response => (setnewPosts(response.data.posts)))
    .catch(function (error) {
      console.log(error);
    })
  }, [])

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


