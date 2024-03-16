import { useEffect, useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";

import "./Packages.scss";
import { PackagesCard } from '../../sub-components'

export default function Packages() {

  const [data, setData] = useState([]);
  const searchBoxFilterStore = useSelector((state) => state.searchBoxFilter);

  useEffect(() => {
    const getEventId = async () => {
      try {
        if(searchBoxFilterStore.eventType) {
          const eventMasterResponse = await axios.get('http://localhost:8000/eventify_server/eventMaster/getEventId', {
            params: {
              eventName: searchBoxFilterStore.eventType
            }
          });
          return eventMasterResponse.data;
        }
        return null;
      }
     catch(error) {
        console.error('Error fetching data:', error);
        return null;
      }
    }

    const fetchData = async () => {
      const eventId = await getEventId();
      try {
        const hallMasterResponse = await axios.get(`http://localhost:8000/eventify_server/hallMaster/`, {
          params: {
            hallCity: searchBoxFilterStore.cityName,
            eventId: eventId
          }
        });
        setData(hallMasterResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchBoxFilterStore.cityName, searchBoxFilterStore.eventType]); 

  return (
    <div className="packages__container" id="packages">
      <div className="tags__wrapper">
        <div className="tag">
          <button>Most Popular</button>
        </div>
        <div className="tag">
          <button>Top Rated</button>
        </div>
        <div className="tag">
          <button>Most Liked</button>
        </div>
        <div className="tag">
          <button>Oldest</button>
        </div>
        <div className="tag">
          <button className="special">All</button>
        </div>
      </div>
      <div className="packages__wrapper">
        {Object.values(data).map((card, index) => (
          <div
            className="card"
            key={index}
          >
            <PackagesCard key={index} card={card}/>
          </div>
        ))}
      </div>
    </div>
  );
}
