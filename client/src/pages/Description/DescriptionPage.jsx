import { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import {
  NavBar,
  Footer,
  AboutPage,
  Testimonials,
  VenueSummary,
  FAQ,
  HallDescription,
  Location,
  HallInformation,
  Gallery,
  AvailabilityCalendar,
  AdditionalVendorDetails,
  BookingDetailsDialog
} from '../../components'

import './DescriptionPage.scss'
import { LoadingScreen } from '../../sub-components';

export default function DescriptionPage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hallId = searchParams.get('hallId');

  const [hallData, setHallData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openBookingDetailsDialog, setOpenBookingDetailsDialog] = useState(false);
  
  const handleBookingDetailsDialogOpen = ()=> {
    setOpenBookingDetailsDialog(true);
  }

  const handleBookingDetailsDialogClose = ()=> {
    setOpenBookingDetailsDialog(false);
  }

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
        <BookingDetailsDialog 
          open={openBookingDetailsDialog}
          handleClose={handleBookingDetailsDialogClose}
          hallData={hallData}
        />
        <div className='DescriptionPage__container'>
          <div className="main__wrapper">
            <div className="sub-wrapper">
              <div className="column1">
                <HallDescription hallData={hallData}/>
                <AvailabilityCalendar hallData={hallData} />
                <AboutPage />
              </div>
              <div className="column2">
                <AdditionalVendorDetails 
                  handleBookingDetailsDialogOpen={handleBookingDetailsDialogOpen} 
                />
              </div>
            </div>
            <Gallery />
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
