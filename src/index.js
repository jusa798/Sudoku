import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider} from 'react-redux'
import  {createStore} from 'redux';


// REDUX 
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

//REDUCER
function boardReducer(board = nullBoard, action) {
  switch (action.type) {
    case 'INCORRECT':
      //This is assigning a whole new updated board, supplied from the state by the hook setIncorrect in Component <SudokuBoard>
    return Object.assign({}, board, {
      board: action.board
    })

    case "SOLVED":
      return Object.assign({}, board, {
        board: action.board
      })

    default:
      return board
  }
}

function updateIncorrect(board) {
  return {
    type: "INCORRECT",
    board: board
  }
}

function updateSolved(board) {
  return {
    type: "SOLVED",
    board: board
  }
}

//STORE
const store = createStore(boardReducer)


ReactDOM.render(
  
  <Provider store={store}>

  <React.StrictMode>
    <App />
  </React.StrictMode>

  </Provider>,

  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export {updateIncorrect, store, updateSolved};
