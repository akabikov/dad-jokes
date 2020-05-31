import React from "react";
import Poll from "./Poll";
import "./JokeItem.css";

class JokeItem extends React.Component {
  render() {
    const { text, ...poll } = this.props;

    return (
      <div className='JokeItem'>
        {text}
        <Poll {...poll} />
      </div>
    );
  }
}

export default JokeItem;
