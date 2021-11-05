import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import './css/News.css'
export default function News() {
  const [newPosts, setnewPosts] = useState([])

  useEffect(() => {
  axios.get('http://localhost:5000/apistuff/posts')
    .then(response => (setnewPosts(response.data.posts)))
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  const posts = newPosts.map(part =>
  <div className="post-container" key={part.title} style={{
    backgroundImage: `url(posts-images/${part.img})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }}>
    <div className="post-text">
    {part.img}
    <p className="post-title">{part.title}</p>
    <p className="post-text">{part.text}</p>
    </div>
  </div>
    )

  return (
    <div className="allposts-container">{posts}</div>
  )
}


