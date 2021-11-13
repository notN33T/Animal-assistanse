import React                from 'react'
import WeekNews             from './WeekNews/WeekNews'
import Header               from './Header/Header'
import Footer               from './Footer/Footer'
import Goals                from './Goals/Goals'
import News                 from './News/News'
import './css/HomePage.css'

function HomePage() {
  return (
    <div className="home-page-container">
      <Header />
      <WeekNews />
      <Goals />
      <News />
      <Footer />
    </div>
  )
}

export default HomePage;