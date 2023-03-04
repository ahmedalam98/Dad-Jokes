import { Component } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }
  async componentDidMount() {
    // Load Jokes
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      jokes.push(res.data.joke);
    }
    this.setState({ jokes });
  }

  render() {
    return (
      <div className="JokeList">
        <h1>Dad Jokes</h1>
        <div className="JokeList-jokes">
          {this.state.jokes.map((j) => (
            <div key={uuid()}>{j}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
