import { SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Message from './Message';
import { Images } from '../../constants';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './ChatBot.scss'; // Import CSS file for styling

// eslint-disable-next-line react/prop-types
function ChatBot({ onChatClose }) {
  const [inputValue, setInputValue] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [sessionId, setsessionId] = useState(`${Date.now()}`);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const response = await axios.get('http://localhost:8000/eventify_server/chatBot/', {
        params: {
          sessionId
        }
      });
      setMessages(response.data);
    };
    loadMessages();
  }, [sessionId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(sessionId);
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8000/eventify_server/chatBot/', {
            sessionId ,
            inputValue ,
        });
        console.log(response.body);
        setMessages([...messages, { content: inputValue, sender: 'me', timestamp: new Date().toISOString() }]);
        setInputValue('');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  const handleChatClose = () => {
    onChatClose();
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="logo-container">
          <img src={Images.logo} alt="Logo" className="logo" />
          <span className="brand-name"><strong>EventifyConnect</strong> is here to assist you</span>
          <div className="close-icon" onClick={handleChatClose}>❌</div>
        </div>
      </div>
      <div className="message-box">
        <Message text={"Hi, it's great to see you! 👋"} />
        {messages.map((message, index) => (
          <Message key={index} text={message.content} user={message.sender} />
        ))}
      </div>
      <div className="input-container">
        <form onSubmit={handleSubmit} className="input-form">
          <Input className="input-field" placeholder="Ask me anything ..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} suffix={<SendOutlined className="send-icon" type="submit" />} />
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
