function cableLength(matrix:number[][]){
    let matlength = matrix.length - 1
    let leftLen = matrix[0][1] / 2
    let rightLen = matrix[matlength][matlength - 1] / 2 
    let cableToSwitchesLen = matrix[0][matlength] - (leftLen + rightLen)
    let nodeToSwitchesLen = leftLen * Math.ceil(matrix.length / 2) 
                            + rightLen * Math.floor(matrix.length / 2)
    
    return cableToSwitchesLen + nodeToSwitchesLen
}
console.log(cableLength([[0, 6, 20, 20],
    [6 ,0 ,20 ,20],
    [20 ,20 ,0 ,12],
    [20 ,20 ,12 ,0]]))