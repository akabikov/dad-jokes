import React from "react";
import JokeItem from "./JokeItem";
import loadData from "./loadData";
import "./DadJokes.css";

const JOKES_BATCH_SIZE = 10;

class DadJokes extends React.Component {
  state = { jokes: [] };

  componentDidMount() {
    const jokes = JSON.parse(localStorage.getItem("jokes"));

    if (jokes) {
      this.setState({ jokes });
    } else {
      this.addBatchOfJokes();
    }
  }

  getJoke = async (ids) => {
    let joke = await loadData();

    if (ids.has(joke.id)) {
      joke = await this.getJoke(ids);
    }

    return joke;
  };

  addBatchOfJokes = async (n = JOKES_BATCH_SIZE) => {
    let { jokes } = this.state;
    let existIds = new Set(jokes.map((el) => el.id));

    const newJokes = new Array(n);

    for (let i = 0; i < n; i++) {
      let joke = await this.getJoke(existIds);
      newJokes[i] = { ...joke, votes: 0 };
      existIds.add(joke.id);
    }

    jokes = [...jokes, ...newJokes];

    this.setState({ jokes });

    localStorage.setItem("jokes", JSON.stringify(jokes));
  };

  handleClick = () => {
    this.addBatchOfJokes();
  };

  render() {
    const { jokes } = this.state;

    const jokesList = jokes.map(({ id, text, votes }) => (
      <li key={id}>
        <JokeItem id={id} text={text} votes={votes} />
      </li>
    ));

    return (
      <>
        <button onClick={this.handleClick}>More jokes!</button>
        <ol>{jokesList}</ol>
      </>
    );
  }
}

export default DadJokes;
