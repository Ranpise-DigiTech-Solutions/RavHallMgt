import { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
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
import AvailabilityCalendar from '../../components/AvailabilityCalendar/AvailabilityCalendar';
import { LoadingScreen } from '../../sub-components';

export default function DescriptionPage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hallId = searchParams.get('hallId');

  const [hallData, setHallData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      const getData = async () => {
        const response = await axios.get(
          `http://localhost:8000/eventify_server/hallMaster/getHallDetails/?hallId=${hallId}`
        );
        setHallData(response.data[0]);
        setIsLoading(false);
      };

      getData();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [hallId]);

  return (
    <div>
    {isLoading ? (
      <div><LoadingScreen /></div>
    ) : (
      <>
        <NavBar />
        <div className='DescriptionPage__container'>
          <div className="main__wrapper">
            <div className="column1">
              <HallDescription hallData={hallData}/>
              <AvailabilityCalendar hallData={hallData} />
              <AboutPage />
              <Gallery />
            </div>
            <div className="column2"></div>
            <HallInformation />
            <VenueSummary />
            <Testimonials />
            <Location />
            <FAQ /> 
          </div>
        </div>
        <Footer />
      </>
      )}
    </div>
  )
}
