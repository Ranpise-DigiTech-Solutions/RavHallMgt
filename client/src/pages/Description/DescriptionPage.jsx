import { NavBar,Footer } from '../../components'
import AboutPage from '../../components/AboutHall/AboutHall'
import Testimonials from '../../components/Testimonials/Testimonials'
import VenueSummary from '../../components/VenueSummary/venueSummary'
import Location from '../../components/Location/Location'
import FAQ from '../../components/FAQ/Faq'
import HallDescription from '../../components/HallDescription/HallDescription'

import './DescriptionPage.scss'
import Gallery from '../../components/Gallery/Gallery'
import HallInformation from '../../components/HallInformation/HallInformation'



export default function DescriptionPage() {
  return (
    <div>
      <NavBar />
      <div className='Detailedinfo'>


      <HallDescription />
      <AboutPage />
      <Gallery />
      <HallInformation />
      <VenueSummary />
      <Testimonials />
      <Location />
      <FAQ /> 


      </div>
      <Footer />
    </div>
  )
}
