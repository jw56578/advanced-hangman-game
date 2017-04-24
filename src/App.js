import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import state from "./state";
import randomWords from "random-words";

class App extends Component {
	constructor(){
		super();
		this.state = {
			wordToGuess:randomWords(),
			strikes:0,
			guess:"",
			correctGuesses:[]
		};
		for(let i =0; i < this.state.wordToGuess.length; i++){
			this.state.correctGuesses.push("_");
		}
	}
	guess(){
		let location = this.state.wordToGuess.indexOf(this.state.guess);
		if(location > -1){
			this.state.correctGuesses[location] = this.state.guess;
			this.setState({
				correctGuesses:this.state.correctGuesses
			});
		}else{
			this.setState({
				strikes: this.state.strikes + 1
			});
		}
		this.setState({
				guess:""
			});
	}
  render() {
		debugger;
		let className = `strike-${this.state.strikes}`;
		let spans = this.state.correctGuesses.map((letter,index) => {
			return <span key={index}> {letter} </span>;
		});
		if(this.state.correctGuesses.indexOf("_") === -1){
			className = "gamewon";
		}
		if(this.state.strikes >= 6){
			className = "gameover";
		}

    return (
			<div>
				<div  className="hangman-sprites">
					<div className={`${className} current`} />
				</div>
				<div id="inputs">
					<div>{spans}</div>
					<input value={this.state.guess} onChange={
						(e) => {
							this.setState({guess:e.target.value});
						}
					} />
					<button onClick={
						(e) => {
						  this.guess();
						}
					}>Guess</button>
				</div>
			</div>
    );
  }
}

export default App;
