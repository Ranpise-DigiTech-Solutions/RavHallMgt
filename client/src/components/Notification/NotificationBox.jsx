import React from 'react';
import 'bulma/css/bulma.min.css'; // Importing Bulma CSS

class NotificationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleMessages: Array(props.messages.length).fill(true)
    };
  }

  handleDelete = (index) => {
    this.setState(prevState => {
      const updatedVisibleMessages = [...prevState.visibleMessages];
      updatedVisibleMessages[index] = false;
      return { visibleMessages: updatedVisibleMessages };
    });
  };

  render() {
    const { visibleMessages } = this.state;
    const { messages } = this.props;

    return (
      <div>
        {messages.map((message, index) => (
          visibleMessages[index] && (
            <div key={index} className="message">
              <div className="message-header">
                <p>{message.title}</p>
                <button className="delete" aria-label="delete" onClick={() => this.handleDelete(index)}></button>
              </div>
              <div className="message-body">
                {message.body}
              </div>
            </div>
          )
        ))}
      </div>
    );
  }
}

export default NotificationBox;
