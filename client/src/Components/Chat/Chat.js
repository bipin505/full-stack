import React from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { InfoBar } from '../InfoBar/InfoBar';
import './Chat.css';

export class Chat extends React.Component {
  socket;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: '',
      message: '',
      messages: []
    }
  }

  componentDidMount = () => {
    const { name, room } = queryString.parse(this.props.location.search);
    this.socket = io("localhost:4000");
    this.setState({
      name: name,
      room: room
    });
    this.socket.emit("join", { name, room }, () => { });
    this.socket.on("message", async (message) => {
      await this.setState({
        messages: [...this.state.messages, message]
      })
    });
  }
  sendMessage = (e) => {
    e.preventDefault();
    if (this.state.message) {
      this.socket.emit("sendMessage", this.state.message, () => this.setState({ message: '' }));
    }
    document.getElementById('message').value = '';
  };

  render() {
    const listItems = this.state.messages.map((data, i) =>
      <li className={`message ${this.state.name === data.user ? "sender" : " reciever"}`} key={i}><span className={` messageText ${this.state.name === data.user ? "sender" : " reciever"}`}>{data.text}</span><span className="user">{data.user}</span></li>
    )
    return (
      <div className="outerContainer">
        <div className="innercontainer">
          <InfoBar room={this.state.room} name={this.state.name} />
          <ul className="messageContainer">{listItems}</ul>
          <input id="message"
            className="messageInput"
            placeholder="Type your message"
            type="text"
            onChange={async (event) => { await this.setState({
              message: event.target.value
            }) }}
            onKeyPress={(event) =>
              event.key === "Enter" ? this.sendMessage(event) : null
            }
          />
        </div>
      </div>
    )
  }
}