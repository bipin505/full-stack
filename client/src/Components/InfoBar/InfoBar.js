import React from "react";
import './InfoBar.css';

export class InfoBar extends React.Component {
  render() {
    return (
      <div className="infoBar">
        <div className="left">
          <div>
          <span>Room Name : </span>
          <span>{this.props.room}</span>
          </div>
          <div>
          <span>User Name : </span>
          <span>{this.props.name}</span>
          </div>
        </div>
        <div className="right">
          <div><a href="/" onClick={() => {
            
          }}>X</a></div>
        </div>
      </div>
    );
  }
}
