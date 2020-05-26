import React from "react";
import "./JokeItem.css";

class JokeItem extends React.Component {
  render() {
    const { id, text, votes } = this.props;

    return <>{text}</>;
  }
}

export default JokeItem;
