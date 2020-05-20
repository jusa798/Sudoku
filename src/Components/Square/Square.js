import React, {useState} from 'react';
import './Square.css'
import orderedPairConverter from '../../HelperFunctions/orderedPairConverter';
import {store} from "../../index"

const Square = (props) => {
    // eslint-disable-next-line
    const unsubscribe = store.subscribe(() => checkReduxState()) 
    
    let [incorrectState, setState] = useState(false)
   
    let checkStartingPosition = (initialGrid, stringLocation) => { 
        let [i, j] = orderedPairConverter(stringLocation)
        if (initialGrid[i][j] != null) {
            props.updateBoardInitalState(initialGrid[i][j], stringLocation)
            return initialGrid[i][j]
        } else {
            return (
    
                <input 
                    className="inputField" 
                    type="numberLimiter" 
                    maxLength="1" 
                    onChange={(e) => {props.updateSquareInputState(e, props.location)}}
                    autoComplete="off"
                />)
        }
    }

    let checkReduxState = () => {
        let currentBoardState = store.getState()
        if (currentBoardState.board[i][j] === "incorrect") {
            setState(true)
        } else if (currentBoardState.board[i][j] === "solved") {
            setState("solved")
        } else {
            setState(false)
        }
    }

    let assignClass = () => {
        let cssClass = `square ${props.edge}`

        if (incorrectState === true) {
            cssClass = ["square incorrect ", props.edge].join(" ")
        } 

        if (incorrectState === "solved") {
            cssClass = ["square solved ", props.edge].join(" ")
        }
        return cssClass
      
    }

    let [i, j] = orderedPairConverter(props.location)

    return (
        <div className={assignClass()} >
           <div className="inputField-container">
        
        {checkStartingPosition(props.initialPosition, props.location)}

           </div>
        
        </div>
    )
}

export default Square;
