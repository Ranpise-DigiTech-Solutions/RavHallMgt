import { SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Message from './Message';
import { Images } from '../../constants';
import { useEffect, useState } from 'react';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { db } from './firebase';

import './ChatBot.scss'; // Import CSS file for styling

function ChatBot({ onChatClose }) {
  const [inputValue, setInputValue] = useState('');
  const [sessionID, setSessionID] = useState(`SessionID_${Date.now()}`);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const messagesQuery = query(collection(db, `chats/${sessionID}/Messages`));
      const querySnapshot = await getDocs(messagesQuery);
      const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(fetchedMessages);
    };
    loadMessages();
  }, [sessionID]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      try {
        const docRef = await addDoc(collection(db, `chats/${sessionID}/Messages`), {
          content: inputValue,
          sender: 'me',
          timestamp: new Date().toISOString(),
        });
        console.log('Document written with ID: ', docRef.id);
        setInputValue('');
        setMessages([...messages, { content: inputValue, sender: 'me', timestamp: new Date().toISOString() }]);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  const handleChatClose = () => {
    console.log("Closing chatbot from ChatBot component");
    onChatClose();
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="logo-container">
          <img src={Images.logo} alt="Logo" className="logo" />
          <span className="brand-name"><strong>WedmeGood</strong> is here to assist you</span>
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
