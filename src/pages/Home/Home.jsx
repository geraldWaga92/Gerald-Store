
import React from 'react'
import Categories from '../../component/Categories/Categories'
import Contact from '../../component/Contact/Contact'
import FeaturedProducts from '../../component/FeaturedProducts/FeaturedProducts'
import Slider from '../../component/Slider/Slider'
import "./home.scss"

const Home = () => {
  return (
    <div className='home'>
      <Slider />
      <FeaturedProducts type="featured"/>
      <Categories />
      <FeaturedProducts type="trending"/>
      <Contact />
    </div>
  )
}

export default Home