// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Message = ({ text, user = "other" }) => {
  
 
  return (
    <div style={{ marginTop: '10px'  }}>
      <div style={{ backgroundColor: user === 'me' ? 'rgb(0, 102, 255)' : 'white', color: user === 'me' ? 'white' : 'black', padding: '15px 17px', margin: '0px', width: 'fit-content', borderRadius: user === 'me' ? '15px 15px 0px 15px' : '0px 15px 15px 15px', marginRight: user === 'me' ? '20px' : 'auto', marginLeft: user === 'me' ? 'auto' : '20px',maxWidth: '70%' }}>{text}</div>
    </div>
  );
};

export default Message;