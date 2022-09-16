function howManyBlocks(row, column, blockRow, blockColumn){
    let rowSum = 0
    let columnSum = 0
    for(let i = 0; i < row; i += 2 * blockRow - 1){
        if(row - blockRow == i) break
        rowSum += blockRow - 1
    }
    for(let j = 0; j < column; j += 2 * blockColumn - 1){
        if(column - blockColumn == j) break
        columnSum += blockColumn - 1
    }
    let newRow = row - rowSum 
    let newColumn = column - columnSum 
    let res = (newRow * newColumn)/ (blockRow * blockColumn)
    return res
}
console.log(howManyBlocks(5, 7, 1, 1))
console.log(howManyBlocks(10, 10, 2, 3))
console.log(howManyBlocks(5, 7, 2, 1))
