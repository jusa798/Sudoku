
//      I use this to switch back between the typical chess positions (a1, b2, c3, etc) to  
//      actual [i, j] locations for the matrix representation of the board

const orderedPairConverter = (stringLocation, reverse=false, formatted=false) => {
    if (reverse === true) {
        let row = stringLocation[0] + 1;
        let column = stringLocation[1];
    
        
        if (column === 0) {
            column = "a"
        } else if (column === 1) {
            column = "b"
        } else if (column === 2) {
            column = "c"
        } else if (column === 3) {
            column = "d"
        } else if (column === 4) {
            column = "e"
        } else if (column === 5) {
            column = "f"
        } else if (column === 6) {
            column = "g"
        } else if (column === 7) {
            column = "h"
        } else if (column === 8) {
            column = "i"
        };       

        return column + row.toString();
    } else {
        let column = stringLocation[0]  
        if (column === "a") {
            column = 0
        } else if (column === "b") {
            column = 1
        } else if (column === "c") {
            column = 2
        } else if (column === "d") {
            column = 3
        } else if (column === "e") {
            column = 4
        } else if (column === "f") {
            column = 5
        } else if (column === "g") {
            column = 6
        } else if (column === "h") {
            column = 7
        } else if (column === "i") {
            column = 8
        };       
        
        const row = stringLocation[1] - 1;

        if (formatted === true) {
            return [row][column]
        }

        return [row, column]
    } 
    
}

//console.log(orderedPairConverter([0, 1], true))

export default orderedPairConverter;