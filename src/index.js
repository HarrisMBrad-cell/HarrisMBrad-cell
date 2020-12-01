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
    super(props); // aways do this for inheritance 
    this.state = { // setting state
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
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game5 />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}