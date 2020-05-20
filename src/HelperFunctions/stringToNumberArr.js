let stringToNumberArr = (arr) => {
    for (let i = 0; i<arr.length;i++) {
        for (let j =0 ; j<arr[i].length; j++) {
            if (arr[i][j]===0 || arr[i][j]==="0" || arr[i][j]===null) {
                arr[i][j] = null
            } else {
                arr[i][j] = +arr[i][j]
            }
        } 
    }
    return arr
}

export default stringToNumberArr;