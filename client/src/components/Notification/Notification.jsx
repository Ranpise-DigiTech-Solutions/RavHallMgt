import React from 'react';
import NotificationBox from './NotificationBox';
import './Notification.scss';
class Notification extends React.Component {
  render() {
    const messages = [
      { title: "Your booking is successful", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem." },
      { title: "Checkout our new blog !", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem." },
      { title: "An important message 3", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem." },
      { title: "Your booking is successful", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem." },
      { title: "Checkout our new blog !", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem." },
      { title: "An important message 3", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem." },
      { title: "Your booking is successful", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem." },
      { title: "Checkout our new blog !", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem." },
      { title: "An important message 3", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem." }
    ];

    return (
      <div className='notification-container'>
        <h1>Messages:</h1>
        <NotificationBox messages={messages} />
      </div>
    );
  }
}

export default Notification;
