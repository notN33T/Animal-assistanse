import React    from 'react'
import WeekNews from './HomeComponents/WeekNews/WeekNews'
import Header   from './HomeComponents/Header/Header'
import Footer   from './HomeComponents/Footer/Footer'
import Goals    from './HomeComponents/Goals/Goals'
import News     from './HomeComponents/News/News'

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