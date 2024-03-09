import React, { useState } from 'react';
import './AboutUs.scss';
import { Images } from '../../constants';

import GppGoodIcon from '@mui/icons-material/GppGood';
import CancelIcon from '@mui/icons-material/Cancel';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AboutUs() {
  const [activeButton, setActiveButton] = useState(null);

  const handleToggleClass = (btnName) => {
    setActiveButton(btnName === activeButton ? null : btnName);
  };

  return (
    <div className='aboutus__container'>
      <div className='aboutus__wrapper'>
        <div className="sub__wrapper_1">
          <img src={Images.wedding4} alt="" />
        </div>
        <div className="sub__wrapper_2">
          <h3 className='sub_title'>our value</h3>
          <h2 className='title'>value we give you</h2>
          <p className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime assumenda officiis, qui recusandae voluptas totam at. Ut explicabo iusto placeat!</p>
          <div className="wrapper">
            <div className={`content ${activeButton === 'btn_1' ? 'open' : 'closed'}`}>
              <div className="header">
                <GppGoodIcon className='icon'/>
                <h4>Best Rates on market</h4>
                <button onClick={() => handleToggleClass('btn_1')}>
                  <ArrowDropDownIcon className='icon pointy'/>
                </button>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum reiciendis iusto, accusantium quasi consequuntur quo, nesciunt ea distinctio repudiandae quisquam tempore, culpa deserunt illo! Sed.</p>
            </div>
            <div className={`content ${activeButton === 'btn_2' ? 'open' : 'closed'}`}>
              <div className="header">
                <CancelIcon className='icon'/>
                <h4>Best Rates on market</h4>
                <button onClick={() => handleToggleClass('btn_2')}>
                  <ArrowDropDownIcon className='icon pointy'/>
                </button>
              </div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat mollitia laboriosam tempore fuga ad hic nisi, quibusdam harum rem facilis ipsam molestiae alias dignissimos nostrum.</p>
            </div>
            <div className={`content ${activeButton === 'btn_3' ? 'open' : 'closed'}`}>
              <div className="header">
                <AssessmentIcon className='icon'/>
                <h4>Best Rates on market</h4>
                <button onClick={() => handleToggleClass('btn_3')}>
                  <ArrowDropDownIcon className='icon pointy'/>
                </button>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis distinctio maxime officiis expedita aut laborum error modi autem, ratione accusantium doloribus nisi, labore quam laudantium totam soluta, repudiandae sunt illo?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
