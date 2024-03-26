import './Footer.scss'

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  return (
    <div className='footer__container'>
      <div className='company__logo'>
        <h2>EventifyConnect</h2>
      </div>
      <div className="wrapper_1">
        <div className="sub__wrapper_1">
          <div className="links">
            <div className="link__grp_1">
              <p>Careers</p>
              <p>Our Blog</p>
              <p>Contact Us</p>
              <p>Our Service</p>
            </div>
            <div className="link__grp_2">
              <p>Privacy Policy</p>
              <p>Registered Address</p>
              <p>Cancellation Policy</p>
              <p>Terms and Conditions</p>
            </div>
          </div>
          <div className="icons">
            <FacebookIcon className='icon'/>
            <InstagramIcon className='icon'/>
            <XIcon className='icon'/>
            <PinterestIcon className='icon'/>
            <YouTubeIcon className='icon'/>
          </div>
        </div>
        <div className="sub__wrapper_2">
          <div className="title">
           Subscribe to our newsletter 
          </div>
          <div className="email">
            <input type="text" placeholder='Your email here' name='email'/>
            <button>Subscribe</button>
          </div>
          <div className="agreement">
            <input type="checkbox" />
            <p>By checking the box, you agree to <br/> our terms and conditions. </p>
          </div>
        </div>
      </div>
      <div className="wrapper_2">
        <div className="line__separator"></div>
        <div className="copyright__info">
          <p>Copyright &copy;2024 All rights reserved</p>
          <p>Made by Ranpise DigiTech Solutions</p>
        </div>
      </div>
    </div>
  )
}
