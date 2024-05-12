import { useState, useEffect } from 'react';
import './Favorites.scss'
import axios from 'axios';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { PackagesCard } from '../../sub-components';
import UserProfileLeftPanel from '../UserProfileLeftPanel/UserProfileLeftPanel';
import { useMediaQuery } from 'react-responsive';
import { NavBar } from '..';
const Favorites = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [activeComponent, setActiveComponent] = useState(null);

    const handleSetActiveComponent = (component) => {
        setActiveComponent(component);
    };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hallMasterResponse = await axios.get('http://localhost:8000/eventify_server/hallBookingMaster/getHallsAvailabilityStatus/');
        setData(hallMasterResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const renderCards = () => {
    return data.map((card, index) => (
        <PackagesCard card={card} key={index}/>
    ));
  };

  return (
    <>
     {isMobile && <NavBar />}
    <div className="left-panel-container">
    <UserProfileLeftPanel setActiveComponent={handleSetActiveComponent} />
  </div>
    <div className="userFavorites__container">
        <h1><b>Your favorites</b></h1>
      <motion.div className="favorites__wrapper">
        {renderCards()}
      </motion.div>
    </div>
    </>
  );
};

export default Favorites;
