import React from 'react'
import './HomePage.scss'
import { MotionWrap, AppWrap } from '../../wrapper'
import { NavBar, Promotion } from '../../components'

const HomePage = () => {
  return (
    <div>
      <div className="about__wrapper">
        <NavBar/>
        <Promotion/>
      </div>

      {/* <a href='/sign-in'>Sign In</a> */}
    </div>
  )
}

// export default AppWrap(HomePage, 'app__home', 'home');
export default HomePage;