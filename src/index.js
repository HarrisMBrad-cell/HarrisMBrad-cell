import React from "react"; // imports React library
import ReactDOM from "react-dom"; // imports ReactDOM
import "./index.css"; // imports the css file.

/* 
When called, this Square component will create a square button. 
The button inherits the onClick method and the value property 
from the Board component. The value of the "value" property will
be displayed on the button.
*/
function Square(props) {
  //sq function passing props
  return (
    //return statement
    /* button element assigned name and property w/ 
    inherited props to the onClick objects value...*/
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  ); //ending of statment...
} //closing this function.

/* 
The primary job of the Board component is to make a grid of buttons (using the Square component) to make the Tic-Tac-Toe game board.
*/
class Board extends React.Component {
  /*
  This renderSquare method calls the Square component to make one button.
  The method accepts one argument "i".
  */
  renderSquare(i) {
    //HOC pure loaded with i value
    return (
      // return statment...
      /* 
      The value property is passed to the Square component. It is set equal
      to the value that is held in the "i" index of the squares array that
      is passed in via props. These props come from the Game component. This
      value property is what will determine whether the Square will display 
      an "X", an "O", or nothing.

      The onClick property is also passed to the Square component. It is set
      equal to the onClick method that is passed in via props. These props come 
      from the Game component. This onClick value will call the handleClick method
      from the Game component.
      */
      <Square // sq Component
        value={this.props.squares[i]} //value is being set w/ props value inheritance from array i
        onClick={() => this.props.onClick(i)}
      />
    ); // ending statement
  } // closing function.

  // render function will actually make something appear on the screen
  render() {
    // render method call

    /*
    The primary function of this makeRows function is to set up a grid
    of Squares and return it
    */
    const makeRows = () => {
      let squareGrid = []; // creates a variable that will hold an array of arrays of Squares
      let count = 0; // creates a variable that will keep count

      // This loop will repeat three times
      for (let i = 0; i < 3; i++) {
        let squareArray = []; // creates a variable that will hold an array of Squares

        // This loop will repeat three times
        for (let j = 0; j < 3; j++) {
          /* 
          During each iteration of the loop, this line of code creates a Square (by calling
          the renderSquare method that, in turn, calls the Square component) and pushes
          that Square onto the squareArray. The count variable is used as a key and is
          also passed into the renderSquare method to be used as the renderSquare method's "i"
          argument.
          */
          squareArray.push(<td key={count}>{this.renderSquare(count)}</td>);

          // Adds one to the count
          count++;
        }

        /*
        During each iteration of this loop, this line of code pushes the squareArray that was created
        in the inside loop onto the squareGrid array
        */
        squareGrid.push(
          <tr key={i} className="board-row">
            {squareArray}
          </tr>
        );
      }

      // returns the squareGrid array
      return squareGrid;
    };

    // returns the squareGrid array (by calling the makeRows function) and puts it into a table
    return (
      <table>
        <tbody>{makeRows()}</tbody>
      </table>
    );
  }
}

// The Game class is a stateful component that provides most of the game logic
class Game5 extends React.Component {
  // Stateful components need a constructor
  constructor(props) {
    // super() must always be called in a constructor
    super(props);

    /*
    This is the state of the Game component. It holds 4 important properties:

    (1) A history array that will keep a record of every move made during the game.
    (2) An xIsNext boolean that will remember whose turn is next.
    (3) A stepNumber integer that will remember which move number we are on.
    (4) A movesReversed boolean that will remember whether the moves have been
    reversed on the game's status board.
    */
    this.state = {

      // setting state object...
      history: [
        {
          // to object inside the history array
          squares: Array(9).fill(null), //sq values to the amount in the array from rendered Square HOC 0-8, and given a empty value of null.
          clicked: null, // null passed as placeholder
          pastXIsNext: false, // boolean default value...
        },
      ], // end of history array values
      xIsNext: true, // declaring  x is next to boolean value of true
      stepNumber: 0, // declaring steps starting with zero
      movesReversed: false, // boolean default value
    }; // closing the state.
  } // closing component.

  /*
  This handleClick function determines what happens when any of the Squares on the
  Board are clicked. The "i" argument that is passed in is the count variable from 
  the makeRows function of the Board component. This means that each Square will
  pass in it's own unique number between 0-8 into this function.
  */

  /**
   * Set Square Data function for values added. This is for bubbling...
   */
  setSqData = this.data;

  setSqData(i) {

    return i.data; // Data: X Player square location in square onClick value prop is passed about the array

  }

  handleClick(i) {


    /*
    Since this game gives the players the option to reverse the list of past moves on
    the game's status board, this if statement will put the list of past moves back
    in the original order if the list is currently reversed. It calls the handleReorder
    method to accomplish this.
    */
    if (!this.state.movesReversed) {
      this.handleReorder();
    }

    // Makes a variable that holds a copy of the history array that is held in state
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    // Creates a variable that holds the last object in the history array
    const current = history[history.length - 1];

    // Makes a copy of the squares array of the last object in the history array
    const squares = current.squares.slice();

    // Creates a variable that holds the value of the "pastXIsNext" property of the
    // last object in the history array
    const pastXIsNext = current.pastXIsNext;

    // This if statement returns early from the handleClick function if there is a
    // winner or if the square has already been clicked.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    /*
    This line of code determines the value that will be put into the element of the squares
    array whose index corresponds to the Square that was clicked. If it is X's turn, an "X" 
    will be displayed. If it is O's turn, an "O" will be displayed.
  
    This line of code also determines the value that will be passed to the Board component and then
    to the particular Square component. This value will be displayed on the button.
    If it is X's turn, an "X" will be displayed. If it is O's turn, an "O" will be displayed..... 
    */
    squares[i] = this.state.xIsNext ? "X" + i : "O";

    // Sets the new state
    this.setState({
      // A new object is added to the end of the history array
      history: history.concat([
        {
          // This property will hold the new squares array that
          // includes the most recent move
          squares: squares,

          // This property will hold the record of which Square
          // was clicked
          clicked: i,

          // This property will hold the record of whose turn
          // it was
          pastXIsNext: !pastXIsNext,
        },
      ]),

      // Toggles whose turn it is in state
      xIsNext: !this.state.xIsNext,

      // Updates what turn number we are on
      stepNumber: history.length,
    });
  }

  // This handleReorder function controls the reversing of the list of past moves
  handleReorder() {
    // Creates a variable that represents the unordered list in the DOM
    // (the unordered list is the list of past moves)
    var movesList = document.getElementById("movesList");

    // Creates a variable that holds the # of children (items) that the unordered
    // list has
    var i = movesList.childNodes.length;

    // While i >= 0, the code in curly braces will execute, then subtract 1 from i
    while (i--) {
      /*
      For each item in the unordered list, starting with the last one, this line of
      code will take the item out of its original location and place it at the end
      of the list. The end result of this will be a reversal of the original list.
      */
      movesList.appendChild(movesList.childNodes[i]);
    }

    // Sets the new state
    this.setState({
      // Since the list was just reversed, the movesReversed boolean must be toggled
      // so that state knows whether the list is in the default order (start -> finish)
      // or in reverse order (finish -> start)
      movesReversed: !this.state.movesReversed,
    });
  }

  /*
  The jumpTo method is used when the user decides to go back to a previous move (or state).
  The state is "updated" to reflect the selected past move. The step argument represents the
  selected past move number.
  */
  jumpTo(step) {
    // Sets the new state
    this.setState({
      // stepNumber is set to the selected past move number
      stepNumber: step,

      // The state needs to know whose turn it was on the selected past move number. Since X
      // has their turn only on "turn 0" and every even turn, the equation will evaluate to true
      // if the step number that is passed in is 0 or an even number. Otherwise, it will
      // evaluate to false, meaning that it is O's turn.
      xIsNext: step % 2 === 0,
    });
  }

  // render function will actually make something appear on the screen
  render() {
    // Creates a variable that holds a copy of the history array that is in state
    const history = this.state.history.slice();

    // Creates a variable that holds the object that is in the index of the history
    // array that corresponds to the current stepNumber.
    const current = history[this.state.stepNumber];

    // Creates a variable that holds the return value of the calculateWinner function.
    // (The return value will be either "X", "O", or, in the case of a draw, null.)
    const winner = calculateWinner(current.squares);

    //The moves mapping function repeats for every object in the history array
    const moves = history.map((step, move) => {
      // Creates a variable that holds the value of clicked for the object that is in
      // the specified index of the history array
      const currPlay = history[move].clicked;

      // Creates a variable that will hold a column number
      let col;

      // Creates a variable that will hold a row number
      let row;

      /*
      Creates a variable that will hold a string. The text of this string will depend
      on the index that is passed into the moves mapping function. If an index of 0 is passed in, 
      the first part of the ternary operator will evaluate to false. For every other index, the
      first part of the ternary operator will evaluate to true.
      */
      const desc = move ? "Go to move #" + move : "Go to game start";

      // Creates a variable that will hold a string. The text of this string will
      // depend on whether the boolean pastXIsNext is true or false for the object
      // that is in the specified index of the history array.
      const currPlayer = history[move].pastXIsNext ? "X" : "O";

      // This switch statement will set the column and row values based on the index number that
      // is passed in
      switch (currPlay) {
        case 0:
          col = 1;
          row = 1;
          break;
        case 1:
          col = 2;
          row = 1;
          break;
        case 2:
          col = 3;
          row = 1;
          break;
        case 3:
          col = 1;
          row = 2;
          break;
        case 4:
          col = 2;
          row = 2;
          break;
        case 5:
          col = 3;
          row = 2;
          break;
        case 6:
          col = 1;
          row = 3;
          break;
        case 7:
          col = 2;
          row = 3;
          break;
        case 8:
          col = 3;
          row = 3;
          break;
        default:
          break;
      }

      // Creates a variable that will hold a string. The text of the string will depend on the
      // value of the index that is passed in via the "move" argument. For an index of 0, there
      // will be an empty string.
      const summary = move
        ? currPlayer + " played on coordinate " + col + ", " + row
        : "";

      /*
      Returns a list item for each object in the history array. Each list item uses variables (instead
      of hard-coded values) so that different text is shown for each list item. The style property uses a
      ternary operator for conditional styling (the text will be bold if that particular move in the list
      is the current move). The button's onClick property implements the jumpTo method in order to manage
      state while returning to a previous move in the list.
      */
      return (
        <li
          id="item"
          key={move}
          style={
            this.state.stepNumber === move
              ? { fontWeight: "bold" }
              : { fontWeight: "normal" }
          }
        >
          <div>{summary}</div>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    // Creates a variable that will hold text for the status
    let status;

    // If the value that is returned from the calculateWinner function is not null...
    if (winner) {
      // then the status displays who won.
      status = "Winner: " + winner;
    } else if (current.squares.includes(null)) {
      // If the squares array includes null (meaning that there are still some empty spaces
      // on the game board), then the status displays whose turn it is.
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    } else {
      // Otherwise, the status indicates a draw
      status = "Result: Draw!";
    }

    /*
    Returns the game board and a status panel. The Board component is passed the squares property,
    which is used by the Board component to determine the value that is displayed in each Square.
    The Board component is also passed the handleClick method, which controls what happens when the
    Squares on the Board are clicked. The status panel displays a status message, the list of past
    moves held by the moves variable, and a button that allows the user to reverse the order of the
    steps. The button implements the handleReorder method in order to reverse the order of the steps.
    */
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <div id="status">{status}</div>
          <div id="historyTitle">Past Moves:</div>
          <ul id="movesList" style={{ listStyleType: "none" }}>
            {moves}
          </ul>
          <button id="toggleButton" onClick={() => this.handleReorder()}>
            Reverse Steps
          </button>
        </div>
      </div>
    );
  }
}

// This function calculates the winner of the game. The squares argument represents the squares
// array that is held in state.
function calculateWinner(squares) {
  // Creates a variable that holds an array of arrays. Each array inside this array represents
  // a line of squares that, if they all hold the same value ("X" or "O"), would result in a win.
  // All possible winning lines of squares (win conditions) are accounted for in this array.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // This loop will iterate through the lines array, checking each win condition
  for (let i = 0; i < lines.length; i++) {
    // Destructuring of the lines array
    const [a, b, c] = lines[i];

    // If the specified indexes of the passed in squares array all have the same non-null
    // value (either "X" or "O")...
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // then return the value (either "X" or "O") that they have in common
      return squares[a];
    }
  }

  // If the for loop finishes executing without returning a winner, then null is returned,
  // meaning there is not a winner yet.
  return null;
}

// ===============

// This line of code renders the Game component inside the div element that has an id of
// "root". This element is located in the index.html file that is in the public folder.
ReactDOM.render(
  <React.StrictMode>
    <Game5 />
  </React.StrictMode>,
  document.getElementById("root")
);
