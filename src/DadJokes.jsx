import React from "react";
import JokeItem from "./JokeItem";
import loadData from "./loadData";
import "./DadJokes.css";

const JOKES_BATCH_SIZE = 10;

class DadJokes extends React.Component {
  state = { jokes: [] };

  addJoke = async () => {
    let { id, joke: text } = await loadData();

    let isAdded = false;

    this.setState(({ jokes }) => {
      const isRepeat = jokes.some((el) => el.id === id);
      if (isRepeat) return { jokes };

      isAdded = true;
      return { jokes: [...jokes, { id, text, votes: 0 }] };
    });

    if (!isAdded) {
      this.addJoke();
    }
  };

  addBatchOfJokes = () => {
    for (let i = 0; i < JOKES_BATCH_SIZE; i++) {
      this.addJoke();
    }
  };

  componentDidMount() {
    this.addBatchOfJokes();
  }

  render() {
    const { jokes } = this.state;

    const jokesList = jokes.map(({ id, text, votes }) => (
      <li key={id}>
        <JokeItem id={id} text={text} votes={votes} />
      </li>
    ));

    return (
      <>
        <button onClick={this.addBatchOfJokes}>More jokes!</button>
        <ol>{jokesList}</ol>
      </>
    );
  }
}

export default DadJokes;
