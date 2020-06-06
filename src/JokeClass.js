import React, { Component } from "react";

class JokeClass extends Component {
    constructor(props){
        super(props)
        this.upVote = this.upVote.bind(this);
        this.downVote= this.downVote.bind(this);
    }

    upVote() {
        this.props.vote(this.props.id, +1);
    } 
    
    downVote() {
        this.props.vote(this.props.id, -1);
    }


    render(){
        console.log(this.props.votes)
        return (
            <div className="Joke">
            <div className="Joke-votearea">
              <button onClick={this.upVote}>
                <i className="fas fa-thumbs-up" />
              </button>
              {this.props.votes }
              <button onClick={this.downVote}>
                 <i className="fas fa-thumbs-down" />
              </button>
              
            </div>
      
            <div className="Joke-text">{this.props.text}</div>
          </div>
        );
    }
}

export default JokeClass;
