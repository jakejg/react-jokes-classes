import React, { Component } from "react";
import JokeListClass from './JokeListClass'

class JokeClass extends Component {
    constructor(props){
        super(props)
        this.vote = vote.bind(this);
        this.votes= votes;
        this.text = text;
        this.id = id;
    }

    upVote() {
        vote(id, +1);
    } 
    
    downVote() {
        vote(id, -1);
    }


    render(){
        return (
            <div className="Joke">
            <div className="Joke-votearea">
              <button onClick={this.upVote}>
                <i className="fas fa-thumbs-up" />
              </button>
      
              <button onClick={this.downVote}>
                <i className="fas fa-thumbs-down" />
              </button>
      
              {votes}
            </div>
      
            <div className="Joke-text">{text}</div>
          </div>
        );
    }
}

export default Joke;
