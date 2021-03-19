import React, { useState } from "react";
import "./App.css";
import SudokuBoard from "./Components/SudokuBoard/SudokuBoard";
import { store, updateIncorrect } from "./index";

function App() {
  let nullBoard = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],

    [null, null, null, null, null, null, null, null, null], //Representation of the board
    [null, null, null, null, null, null, null, null, null], //Starts out as null so that board can be updated
    [null, null, null, null, null, null, null, null, null], //By State to compare to finished result

    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];

  let createNewBoard = () => {
    return (
      <SudokuBoard arrIndex={randomNumberGenerator()} restart={makeNewGame} />
    );
  };

  let randomNumberGenerator = () => {
    let randomNumber = Math.floor(Math.random() * 9);
    return randomNumber;
  };
  let makeNewGame = () => {
    store.dispatch(updateIncorrect(nullBoard));

    setNewGame(createNewBoard());
  };

  let [newGame, setNewGame] = useState(createNewBoard());

  return <div className='Layout'>{newGame}</div>;
}

export default App;
