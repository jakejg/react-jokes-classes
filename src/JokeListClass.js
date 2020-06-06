import React, { Component } from "react";
import axios from "axios";
import JokeClass from "./JokeClass";
import "./JokeList.css";


class JokeListClass extends Component {
    static defaultProps = {
        numJokesToGet: 10
      };

    constructor(props) {
        super(props);
        this.state = {jokes: []};
        this.getJokes = this.getJokes.bind(this);
        this.generateNewJokes = this.generateNewJokes.bind(this);
        this.vote = this.vote.bind(this);
        this.resetVotes = this.resetVotes.bind(this);
    }

    async getJokes() {
        let j = [...this.state.jokes];
        let seenJokes = new Set();
        try {
          while (j.length < this.props.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com", {
              headers: { Accept: "application/json" }
            });
            let { status, ...jokeObj } = res.data;
            
            if (!seenJokes.has(jokeObj.id)) {
              seenJokes.add(jokeObj.id);
              j.push({ ...jokeObj, votes: 0 });
            } else {
              console.error("duplicate found!");
            }
          }
          this.setState({jokes: j });
        } catch (e) {
          console.log(e);
        }
    }

    generateNewJokes() {
        this.setState({jokes: []});
    }

    vote(id, delta) {
        this.setState(state =>
          ({jokes: state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))})
        );
    }

    componentDidMount(){
        this.getJokes();
    }

    componentDidUpdate(){
        this.getJokes();
    }

    resetVotes() {
        this.setState(state => ({jokes: state.jokes.map(joke => ({ ...joke, votes: 0 }))})
        );
    }


    render() {
            let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
                
            return (
            <div className="JokeList">
                <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                  Get New Jokes
                </button>
                
                <div>
                    {this.state.jokes.length === 0 ? 
                    <i className="fa fa-spinner fa-spin fa-4x" /> : 
                    sortedJokes.map(j => (
                     <JokeClass text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
                    ))}
                </div>
                
                <button className="JokeList-getmore" onClick={this.resetVotes}>Clear Votes</button>
                
            </div>)
    }
}

export default JokeListClass;