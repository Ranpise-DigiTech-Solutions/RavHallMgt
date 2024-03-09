import React from 'react'
import './HomePage.scss'
import { MotionWrap, AppWrap } from '../../wrapper'
import { NavBar, Promotion, Destinations, SearchBar, Packages, AboutUs } from '../../components'

const HomePage = () => {
  return (
    <>
      {/* <NavBar/> */}
      <Promotion />
      <Destinations />
      <SearchBar /> 
      <Packages />
      <AboutUs />

      {/* <a href='/sign-in'>Sign In</a> */}
    </>
  )
}

// export default AppWrap(HomePage, 'app__home', 'home');
export default HomePage;