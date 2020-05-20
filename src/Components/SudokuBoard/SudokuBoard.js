import React, { useState }  from 'react';
import './SudokuBoard.css';
import Square from '../Square/Square'
import orderedPairConverter from '../../HelperFunctions/orderedPairConverter'
import stringToNumberArr from '../../HelperFunctions/stringToNumberArr'
import {questionsArr, solutionsArr} from '../../Puzzles/PuzzlesList'
import {updateIncorrect, store, updateSolved} from '../../index'



const Board = (props) => {


    let nullBoard = 
                    [   [null, null, null,    null, null, null,     null,  null,  null],
                        [null, null, null,    null, null, null,     null,  null,  null],
                        [null, null, null,    null, null, null,     null,  null,  null], 

                        [null, null, null,    null, null, null,     null,  null,  null],      //Representation of the board
                        [null, null, null,    null, null, null,     null,  null,  null],      //Starts out as null so that board can be updated
                        [null, null, null,    null, null, null,     null,  null,  null],      //By State to compare to finished result

                        [null, null, null,    null, null, null,     null,  null,  null], 
                        [null, null, null,    null, null, null,     null,  null,  null], 
                        [null, null, null,    null, null, null,     null,  null,  null], 
    ];
    
    let emptyBoard = 
                    [   ["", "", "",    "", "", "",     "",  "",  ""],
                        ["", "", "",    "", "", "",     "",  "",  ""],
                        ["", "", "",    "", "", "",     "",  "",  ""], 

                        ["", "", "",    "", "", "",     "",  "",  ""],      //Representation of the board
                        ["", "", "",    "", "", "",     "",  "",  ""],      //Starts out as "" so that board can be updated
                        ["", "", "",    "", "", "",     "",  "",  ""],      //By State to compare to finished result

                        ["", "", "",    "", "", "",     "",  "",  ""], 
                        ["", "", "",    "", "", "",     "",  "",  ""], 
                        ["", "", "",    "", "", "",     "",  "",  ""], 
    ];
    
    let solvedBoardRedux = 
                    [   ["solved", "solved", "solved",    "solved", "solved", "solved",     "solved",  "solved",  "solved"],
                        ["solved", "solved", "solved",    "solved", "solved", "solved",     "solved",  "solved",  "solved"],
                        ["solved", "solved", "solved",    "solved", "solved", "solved",     "solved",  "solved",  "solved"], 

                        ["solved", "solved", "solved",    "solved", "solved", "solved",     "solved",  "solved",  "solved"],      //Representation of the board
                        ["solved", "solved", "solved",    "solved", "solved", "solved",     "solved",  "solved",  "solved"],      //Starts out as "" so that board can be updated
                        ["solved", "solved", "solved",    "solved", "solved", "solved",     "solved",  "solved",  "solved"],      //By State to compare to finished result

                        ["solved", "solved", "solved",    "solved", "solved", "solved",     "solved",  "solved",  "solved"], 
                        ["solved", "solved", "solved",    "solved", "solved", "solved",     "solved",  "solved",  "solved"], 
                        ["solved", "solved", "solved",    "solved", "solved", "solved",     "solved",  "solved",  "solved"], 
    ];

    const [board, setBoardState] = useState(nullBoard); // STATE HOOK Setting load state to empty board
    const [incorrectBoard, setIncorrect] = useState(emptyBoard); // STATE HOOK This board is used to have a reference to the incorrect squares
    const [solvedState, setSolved] = useState(false); // STATE HOOK Used to show "Success" screen and turn all squaures to green color 

    const getNewGame = (randomNumber) => {
        let initialPosition = questionsArr[randomNumber]
        let solution = solutionsArr[randomNumber]
        return [stringToNumberArr(initialPosition), stringToNumberArr(solution)]
    }

    const submitHandler = () => {
        let counter = 0;
        
        for (let i = 0; i<board.length;i++) {
            for (let j =0 ; j<board[i].length; j++) {
                if (board[i][j] !== solvedPosition[i][j] && board[i][j] !== null) {
                    incorrectBoard[i][j] = "incorrect"
                    setIncorrect(incorrectBoard)
                    store.dispatch(updateIncorrect(incorrectBoard))
                    counter++
                } else if (board[i][j] !== solvedPosition[i][j]) {
                    counter++
                }
            }
        }
        if (counter === 0) {
            solved(); 
        }
    }

    const checkSolved = () => {
        if (solvedState) {
            return <div className="success">SUCCESS!</div>
        }
    }

    const solved = () => {
        store.dispatch(updateSolved(solvedBoardRedux));    
        setSolved(true)    
    }
    
    const updateBoardInitalState = (number, location) => {
        let [row, column] = orderedPairConverter(location);
        board[row][column] = number;
        setBoardState(board);
    }

    const updateSquareInputState = (e, location) => {
        let [i, j] = orderedPairConverter(location)  
        if (e.target.value == "") {
            setSolved(false)
            board[i][j] = null;
            setBoardState(board)
            incorrectBoard[i][j] = null;
            setIncorrect(incorrectBoard)
            store.dispatch(updateIncorrect(incorrectBoard))
        } else {
            board[i][j] = +e.target.value;
            setBoardState(board)
            incorrectBoard[i][j] = null;
            setIncorrect(incorrectBoard)
            store.dispatch(updateIncorrect(incorrectBoard))
        }
        
    };
  
    let restart = () => {
        setBoardState(nullBoard)
        setIncorrect(emptyBoard)
        props.restart()
    }

    let [initialPosition, solvedPosition] = getNewGame(props.arrIndex)

    return (
        <div className="page-container">
            {checkSolved()}
                <ul className="button-container">
                    <button className="btn" id="btn-1" onClick= {submitHandler}>Submit</button>
                    <button className="btn" id="btn-2" onClick= {restart}>New Game</button>
                </ul>
          
            <div className="board-container">            
                
                <div className="square-container">
                
                    {/* SQUARES BY ROWS */}
                
                                            {/* Row1 */}
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="a1" edge="left top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="b1" edge="top" />
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="c1" edge="top right margin-fix-left"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="d1" edge="top left"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="e1" edge="top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="f1" edge="top right margin-fix-left"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="g1" edge="top left"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="h1" edge="top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="i1" edge="top right margin-fix-left"/>
                
                                            {/* Row2 */}
                <Square updateBoardInitalState={updateBoardInitalState}  initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="a2" edge="left"/>
                <Square updateBoardInitalState={updateBoardInitalState}  initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="b2"/>
                <Square updateBoardInitalState={updateBoardInitalState}  initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="c2" edge="right margin-fix-left"/>
                <Square updateBoardInitalState={updateBoardInitalState}  initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="d2" edge="left"/>
                <Square updateBoardInitalState={updateBoardInitalState}  initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="e2"/>
                <Square updateBoardInitalState={updateBoardInitalState}  initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="f2" edge="right margin-fix-left"/>
                <Square updateBoardInitalState={updateBoardInitalState}  initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="g2" edge="left"/>
                <Square updateBoardInitalState={updateBoardInitalState}  initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="h2"/>
                <Square updateBoardInitalState={updateBoardInitalState}  initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="i2" edge="right margin-fix-left"/>
                
                                            {/* Row3 */}
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="a3" edge="left bottom margin-fix-top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="b3" edge="bottom margin-fix-top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="c3" edge="bottom right margin-fix-left margin-fix-top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="d3" edge="bottom left margin-fix-top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="e3" edge="bottom margin-fix-top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="f3" edge="bottom right margin-fix-left margin-fix-top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="g3" edge="bottom left margin-fix-top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="h3" edge="bottom margin-fix-top"/>
                <Square updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="i3" edge="right bottom margin-fix-left margin-fix-top"/>
            
                                            {/* Row4 */}
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="a4" edge="left top "/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="b4" edge="top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="c4" edge="top right margin-fix-left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="d4" edge="top left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="e4" edge="top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="f4" edge="top right margin-fix-left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="g4" edge="top left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="h4" edge="top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="i4" edge="right top margin-fix-left"/>
            
                                            {/* Row5 */}
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="a5" edge="left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="b5"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="c5" edge="right margin-fix-left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="d5" edge="left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="e5"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="f5" edge="right margin-fix-left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="g5" edge="left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="h5"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="i5" edge="right margin-fix-left"/>
            
                                            {/* Row6 */}
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="a6" edge="left bottom margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="b6" edge="bottom margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="c6" edge="bottom right margin-fix-left margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="d6" edge="bottom left margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="e6" edge="bottom margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="f6" edge="bottom right margin-fix-left margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="g6" edge="bottom left margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="h6" edge="bottom margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="i6" edge="right bottom margin-fix-left margin-fix-top"/>
                
                                            {/* Row7 */}
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="a7" edge="left top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="b7" edge="top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="c7" edge="top right margin-fix-left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="d7" edge="left top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="e7" edge="top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="f7" edge="right top margin-fix-left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="g7" edge="left top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="h7" edge="top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="i7" edge="right top margin-fix-left"/>
                
                                            {/* Row8 */}
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="a8" edge="left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="b8"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="c8" edge="right margin-fix-left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="d8" edge="left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="e8"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="f8" edge="right margin-fix-left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="g8" edge="left"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="h8"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="i8" edge="right margin-fix-left"/>
                                            {/* Row9 */}
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="a9" edge="left bottom margin-fix-top"                             />
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="b9" edge="bottom margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="c9" edge="bottom right margin-fix-left margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="d9" edge="bottom left margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="e9" edge="bottom margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="f9" edge="bottom right margin-fix-left margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="g9" edge="bottom left margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="h9" edge="bottom margin-fix-top"/>
                <Square  updateBoardInitalState={updateBoardInitalState} initialPosition = {initialPosition} updateSquareInputState={updateSquareInputState} location="i9" edge="bottom right margin-fix-left margin-fix-top"/>
                
            
                </div>
 
            </div>
        </div>
    )
}

export default Board;