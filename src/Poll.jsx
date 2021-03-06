import React from "react";
import "./Poll.css";

const STEP = {
  up: +1,
  down: -1,
};

class Poll extends React.Component {
  handleClick = (evt) => {
    const { vote, id } = this.props;
    vote(id, STEP[evt.target.name]);
  };

  render() {
    const { rating } = this.props;

    let ratingClass =
      +rating > 0 ? "positive" : +rating < 0 ? "negative" : "neutral";

    return (
      <div className='Poll'>
        <button name='up' onClick={this.handleClick} />
        <span className={ratingClass}>{rating}</span>
        <button name='down' onClick={this.handleClick} />
      </div>
    );
  }
}

export default Poll;
