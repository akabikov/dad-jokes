import React from "react";

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

    return (
      <>
        <button name='up' onClick={this.handleClick}>
          Up
        </button>
        <span>{rating}</span>
        <button name='down' onClick={this.handleClick}>
          Down
        </button>
      </>
    );
  }
}

export default Poll;
