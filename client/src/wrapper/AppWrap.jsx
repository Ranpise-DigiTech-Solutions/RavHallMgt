import React, { useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ChatBot from '../components/ChatBot/ChatBot';

const AppWrap = (Component, idName, classNames) => function HOC() {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleChatBotClick = () => {
    console.log("Chatbot icon clicked");
    setShowChatBot(prevState => !prevState);
  };

  const handleChatClose = () => {
    console.log("Closing chatbot");
    setShowChatBot(false);
  };

  console.log("showChatBot:", showChatBot);

  return (
    <div id={idName} className={`appwrap__container ${classNames}`}>
      <Component onChatClose={handleChatClose} />
      <WhatsAppIcon
        className='chatbot__icon'
        onClick={handleChatBotClick}
        style={{ display: showChatBot ? 'none' : 'block' }}
      />
      {showChatBot && <ChatBot onChatClose={handleChatClose} />}
    </div>
  );
};

export default AppWrap;
