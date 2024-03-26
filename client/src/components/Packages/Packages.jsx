import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import "./Packages.scss";
import { PackagesCard } from '../../sub-components'

export default function Packages() {

  const [data, setData] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [filteredCards, setFilteredCards] = useState([]);

  const wrapperRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  
  const searchBoxFilterStore = useSelector((state) => state.searchBoxFilter);

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      if (pageNumber > 0 && pageNumber <= totalPages)
      setCurrentPage(pageNumber);
    }
  };

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
            hallCity: searchBoxFilterStore.cityName.split(',')[0].trim(),
            eventId: eventId
          }
        });
        setData(hallMasterResponse.data);
        setFilteredCards(hallMasterResponse.data);
        setTotalPages(Math.ceil(Object.values(hallMasterResponse.data).length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchBoxFilterStore.cityName, searchBoxFilterStore.eventType]);

  // To provide the scroll effect when the cards change
  useEffect(() => {
    if (wrapperRef.current) {
      const { top } = wrapperRef.current.getBoundingClientRect();
      // Scroll to the top of the wrapper element relative to the viewport
      window.scrollTo({ top: window.scrollY + top, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleCardFilter = (item) => {
    setActiveFilter(item)
    setAnimateCard({y:100, opacity:0}) //to get the shuffled animation of the cards
    setTimeout(() => {
      setAnimateCard({y:0, opacity:1})

      setFilteredCards(data);
    }, 500);
  };
  
  const renderCards = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = Object.values(filteredCards).slice(startIndex, endIndex);

    return slicedData.map((card, index) => (
      <div className="card" key={index}>
        <PackagesCard card={card} key={index} />
      </div>
    ));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 3) { // Render all page numbers if less than or equal to 3
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
            <div
              className={`counter ${currentPage === i ? 'selected__counter' : ''}`}
              key={i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </div>
          );
        }
      } else if (currentPage <= totalPages-2) { // if more than 3 and less than total 'totalpages - 1'
 
        pageNumbers.push(
          <div
            className="counter selected__counter"
            key={currentPage}
          >
            {currentPage}
          </div>
        );
        pageNumbers.push(
          <div
            className="counter"
            key={currentPage+1}
            onClick={() => handlePageChange(currentPage+1)}
          >
            {currentPage+1}
          </div>
        );
        pageNumbers.push(
          <div className="counter" key="ellipsis">
            ...
          </div>
        );
        pageNumbers.push(
          <div
            className={`counter ${currentPage === totalPages ? 'selected__counter' : ''}`}
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </div>
        );
      } else { // if page numbers are greater than 'totalpages - 2'
        pageNumbers.push(
          <div
            className="counter"
            key={1}
            onClick={() => handlePageChange(1)}
          >
            {1}
          </div>
        );
        pageNumbers.push(
          <div className="counter" key="ellipsis">
            ...
          </div>
        );
        pageNumbers.push(
          <div
            className={`counter ${currentPage==totalPages-1 && 'selected__counter'}`}
            key={totalPages-1}
            onClick={() => handlePageChange(totalPages-1)}
          >
            {totalPages-1}
          </div>
        );
        pageNumbers.push(
          <div
            className={`counter ${currentPage === totalPages ? 'selected__counter' : ''}`}
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </div>
        );
      }
    
    return pageNumbers;
  };
  
  return (
    <div className="packages__container" id="packages" ref={wrapperRef}>
      <div className="tags__wrapper">
        {["Most Popular", "Top Rated", "Most Liked", "Oldest", "All"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => {handleCardFilter(item)}}
              className={`tag ${
                activeFilter === item ? "active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>
      <motion.div 
        className="packages__wrapper"
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
      >
        {renderCards()}
      </motion.div>
      <div className="packagecount__wrapper">
        <div className="counter" onClick={() => handlePageChange(1)}><a href="#packages">First</a></div>
        <div className="counter" onClick={() => handlePageChange(currentPage-1)}><a href="#packages">Previous</a></div>
        {
          renderPageNumbers()
        }
        <div className="counter" onClick={() => handlePageChange(currentPage+1)}><a href="#packages">Next</a></div>
        <div className="counter" onClick={() => handlePageChange(totalPages)}><a href="#packages">Last</a></div>
      </div>
    </div>
  );
}
