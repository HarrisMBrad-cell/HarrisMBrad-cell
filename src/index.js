import React from 'react'; // importing Libs
import ReactDOM from 'react-dom'; // importing Virtuial Document Object Model 
import './index.css'; // importing the file into this file...


function Square(props) { // sq function passing props
  return ( // return statement
    /* button element assigned name and property w/ 
    inherited props to the onClick objects value...*/
    <button className="square" onClick={props.onClick}> 
      {props.value} 
    </button>
  ); // ending of statment...
} // closing this function.

class Board extends React.Component { // this class extends thus ES6, parent/child hirarchy...
  renderSquare(i) { // HOC pure loaded with i value
    return ( // return statment
      <Square // Sq Component 
        value={this.props.squares[i]} // value is being set w/ props value inheritance from array i
        onClick={() => this.props.onClick(i)} // built-in onClick pushing property object from array values
      />
    ); // ending statment
  } // closing function.

  render() { // render method call
    return ( // to return these pure HOC's objects below...0-8 in rows of three w/ class name of board-row...
      <div> 
        <div className="board-row"> 
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div> 
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    ); // closing the method
  } // closing the function...
} // closing the class HOC...

class Game5 extends React.Component { // this class extends thus ES6, parent/child hirarchy for Game 5 component. 
  constructor(props) { // getting derived state from props for the mounting process
    super(props); // always do this for inheritance 
    this.state = { // setting state object...
      history: [ // to a history array
        {
          squares: Array(9).fill(null) // sq values to the amount in the array from rendered Square HOC 0-8, and given a empty value of null. 
        }
      ],// end of history array values
      stepNumber: 0, // declaring steps starting w/0
      xIsNext: true // declaring  x is next to boolean value of true
    }; // closing the state.
  } // closing the class HOC...

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // returning selected elements in the array...according to the state history...
    const current = history[history.length - 1]; // subtracting from the lenghth of the array...
    const squares = current.squares.slice(); // returning the sq elements to check...
    if (calculateWinner(squares) || squares[i]) { // evealuation of the squares' state comparing squares value in the array...
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";// xIsnext equality query to sq value...using ternary operator...
    this.setState({ // setting state to this...
      history: history.concat([ // history being concatinated for sq 
        {
          squares: squares // equivilancy declaration...
        }
      ]), // closing array to be cocatinated over...
      stepNumber: history.length, // stepping threough the length of the array's history...
      xIsNext: !this.state.xIsNext // statement saying what's not next...
    }); // closing the handelclick method. 
  } // closing that function.

  jumpTo(step) { // from onClick handler the jumpTo method recalls the steps from xIsnext concatenation to new state of steps. 
    this.setState({ // step object evaluation checking for state
      stepNumber: step, // steps being updated...
      xIsNext: (step % 2) === 0 // set even as there are only two player options. 
    }); // cloing the step evaluation
  } // closing the function method. 

  render() {
    const history = this.state.history; // setting state to recall. 
    const current = history[this.state.stepNumber]; // updating array to be recalled. 
    const winner = calculateWinner(current.squares); // evaluation for winner function passing current position from map history. 

    const moves = history.map((step, move) => { // moves being checked each step and move...
      const desc = move ? // looking for the move...
        'Go to move #' + move : // string for the move
        'Go to game start'; // string for the start
      return ( // method to list the moves to key position
        <li key={move}> 
          <button 
          onClick={() => this.jumpTo(move)}>{desc}
          </button>
        </li>
      );
    });
// try catch to check for winner of the game. 
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return ( // starting the return method
      <div className="game">
        <div className="game-board">
          <Board // passing props to squares to handle the value of that event listener
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          /> 
        </div>
        <div className="game-info"> 
          <div>{status}</div>
          
          <ol>{moves}</ol> 
        </div> 
      </div>
    ); // ending of the built-in return method.
  }
} // ending of the class function.

ReactDOM.render(<Game5 />, document.getElementById("root")); // Vertuial DOM rendering Game 5 to browser by calling the root element id...

function calculateWinner(squares) { // setting up the function for a loop
  const lines = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; // closing the array...
  for (let i = 0; i < lines.length; i++) { // looking for the length of array of lines to evaluate the value condition 
    const [a, b, c] = lines[i]; // three lines per 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // checking on what to return based on sq values...
      return squares[a]; // returning what is discovered based on the evaluation.
    }
  }
  return null; // a place holder value 
}