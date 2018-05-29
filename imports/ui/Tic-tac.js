import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/task.js';
import './Tictac.css';

class Tictac extends React.Component {

	constructor(){
		super();
		this.state={
			turn: true,
			winner: '',
			user1: '',
			user2: '',
			symbol_1: '',
			symbol_2: '',
			field: [[0,1,2],[3,4,5],[6,7,8]],
		}
	}

	componentWillMount(){
		let user1 = window.prompt("Player1 name.");
		let user2 = window.prompt("Player2 name.");
		Meteor.call('tasks.insert',user1);
		Meteor.call('tasks.insert',user2);
		this.setState({
			user1: user1,
			user2: user2,
		});
	}

	handleSelect(event){
		if(event.target.value === 'X'){
			this.setState({
				symbol_1: 'X',
				symbol_2: 'O',
			});
		}
		else{
			this.setState({
				symbol_1: 'O',
				symbol_2: 'X'
			});
		}
	}
	
	handleField(x,y){
		let turn = this.state.turn;
		if(this.state.turn === true){
			this.state.field[x][y] = this.state.symbol_1;
			this.setState({
				field: this.state.field,
				turn: !turn
			});
		}
		else{
			this.state.field[x][y] = this.state.symbol_2;
			this.setState({
				field: this.state.field,
				turn: !turn
			});
		}

		let arr = this.state.field;
	  if((arr[0][0] === arr[0][1] && arr[0][1] === arr[0][2])||
			(arr[1][0] === arr[1][1] && arr[1][1] === arr[1][2])||
			(arr[2][0] === arr[2][1] && arr[2][1] === arr[2][2])||
			(arr[0][0] === arr[1][0] && arr[1][0] === arr[2][0])||
			(arr[0][1] === arr[1][1] && arr[1][1] === arr[2][1])||
			(arr[0][2] === arr[1][2] && arr[1][2] === arr[2][2])||
			(arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2])||
			(arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0])){
			this.setState({
				
				winner: " Won The Game.",
			});
		}
	}

	handlePlay(){
		this.setState({
			turn: true,
			winner: '',
			count: 0,
			field : [[0,1,2],[3,4,5],[6,7,8]],
		});
	}

	render(){
		console.log(this.props.tasks);
		return(
			<div>
				<h1>Tic-Tac-Toe</h1>
				<div>
					<h3>Select the Input.</h3>
					<input type="button" onClick={(event) => this.handleSelect(event)} value="X"/>
					<input type="button" onClick={(event) => this.handleSelect(event)} value="O"/>
				</div>
				<br />
				<h3 className="play">{this.state.turn ? this.state.user2 : this.state.user1}{this.state.winner}</h3>
				<h3>Turn : {this.state.turn ? this.state.user1+" ("+this.state.symbol_1+" )" : this.state.user2+" ("+this.state.symbol_2+" )"}</h3>
			  <table id="board" border='5px'>
			    <tbody>
          	<tr>
          		<td className="field" onClick={() => this.handleField(0,0)}>{this.state.field[0][0]}</td>
    					<td className="field" onClick={() => this.handleField(0,1)}>{this.state.field[0][1]}</td>
    					<td className="field" onClick={() => this.handleField(0,2)}>{this.state.field[0][2]}</td>
  					</tr>
  					<tr>
    					<td className="field" onClick={() => this.handleField(1,0)}>{this.state.field[1][0]}</td>
    					<td className="field" onClick={() => this.handleField(1,1)}>{this.state.field[1][1]}</td>
    					<td className="field" onClick={() => this.handleField(1,2)}>{this.state.field[1][2]}</td>
  					</tr>
  					<tr>
    					<td className="field" onClick={() => this.handleField(2,0)}>{this.state.field[2][0]}</td>
    					<td className="field" onClick={() => this.handleField(2,1)}>{this.state.field[2][1]}</td>
    					<td className="field" onClick={() => this.handleField(2,2)}>{this.state.field[2][2]}</td>
  					</tr>
  				</tbody>
				</table>
				<div>
					<button onClick={() => this.handlePlay()}>Play again</button>
				</div>
				<div>
					<h3>User 1 : { this.state.user1 }</h3>
					<h3>User 2 : { this.state.user2 }</h3>
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 },limit: 2 }).fetch(),
  };
})(Tictac)