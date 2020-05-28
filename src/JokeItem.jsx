import React from "react";
import Poll from "./Poll";
import "./JokeItem.css";

class JokeItem extends React.Component {
  render() {
    const { text, ...poll } = this.props;

    return (
      <>
        {text}
        <Poll {...poll} />
      </>
    );
  }
}

export default JokeItem;
