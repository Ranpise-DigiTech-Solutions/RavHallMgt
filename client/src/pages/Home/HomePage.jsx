import React from 'react'
import './HomePage.scss'
import { MotionWrap, AppWrap } from '../../wrapper'
import { NavBar } from '../../components'

const HomePage = () => {
  return (
    <div>
      <NavBar/>

      {/* <a href='/sign-in'>Sign In</a> */}
    </div>
  )
}

// export default AppWrap(HomePage, 'app__home', 'home');
export default HomePage;