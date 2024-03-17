import { useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { ChatBot } from '../components';

const AppWrap = (Component, idName, classNames) => function HOC() {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleChatBotClick = () => {
    setShowChatBot(prevState => !prevState);
  };

  const handleChatClose = () => {
    setShowChatBot(false);
  };

  console.log("showChatBot:", showChatBot);

  return (
    <div id={idName} className={`appwrap__container ${classNames}`}>
      <Component />
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
