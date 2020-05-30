import React from "react";
import JokeItem from "./JokeItem";
import loadData from "./loadData";
import "./DadJokes.css";

const JOKES_BATCH_SIZE = 10;

class DadJokes extends React.Component {
  state = { jokes: [], isLoading: false };

  componentDidMount() {
    const jokes = JSON.parse(localStorage.getItem("jokes"));

    if (jokes) {
      this.setState({ jokes });
    } else {
      this.addBatchOfJokes();
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    const { jokes } = this.state;
    if (prevState.jokes !== jokes) {
      localStorage.setItem("jokes", JSON.stringify(jokes));
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
    this.setState({ isLoading: true });

    let { jokes } = this.state;
    let existIds = new Set(jokes.map((el) => el.id));

    const newJokes = new Array(n);

    for (let i = 0; i < n; i++) {
      let joke = await this.getJoke(existIds);
      newJokes[i] = { ...joke, rating: 0 };
      existIds.add(joke.id);
    }

    jokes = [...jokes, ...newJokes];

    this.setState({ jokes, isLoading: false });

    localStorage.setItem("jokes", JSON.stringify(jokes));
  };

  handleClick = () => {
    this.addBatchOfJokes();
  };

  vote = (id, step) => {
    this.setState(({ jokes }) => ({
      jokes: jokes
        .map((el) => (el.id === id ? { ...el, rating: el.rating + step } : el))
        .sort((a, b) => b.rating - a.rating),
    }));
  };

  render() {
    const { jokes, isLoading } = this.state;

    const jokesList = jokes.map((joke) => (
      <li key={joke.id}>
        <JokeItem {...joke} vote={this.vote} />
      </li>
    ));

    const loader = isLoading ? <div class='Loader'></div> : "";

    return (
      <>
        {loader}
        <button onClick={this.handleClick}>More jokes!</button>
        <ol>{jokesList}</ol>
      </>
    );
  }
}

export default DadJokes;
