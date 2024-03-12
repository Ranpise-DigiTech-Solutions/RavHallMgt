import React from 'react'
import './HomePage.scss'
import { MotionWrap, AppWrap } from '../../wrapper'
import { NavBar, Promotion, Destinations, SearchBar, Packages, AboutUs, Stories, Blogs, Footer } from '../../components'

const HomePage = () => {

  return (
    <>
      <NavBar/>
      <Promotion />
      <Destinations />
      <SearchBar /> 
      <Packages />
      <AboutUs />
      <Stories />
      <Blogs />
      <Footer />
    </>
  )
}

// export default AppWrap(HomePage, 'app__home', 'home');
// export default AppWrap(HomePage, "", "");
export default HomePage;