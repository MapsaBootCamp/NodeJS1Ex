function nQueen(n){
    let columns = new Set()
    let posDiag = new Set()
    let negDiag = new Set()
    let res = []
    let board = Array(n).fill(0).map(() => Array(n).fill("."))
    
    function backTrack(row) {
        console.log(board, posDiag, negDiag, columns);
        if(row == n){
            console.log("slalm............",board);
            res = res.concat(board)
            return
        }
    
        for(let column = 0; column < n; column++){
            if(columns.has(column) || posDiag.has(row + column) || negDiag.has(row - column)){
                continue
            }
            board[row][column] = "Q"
            columns.add(column)
            posDiag.add(row + column)
            negDiag.add(row - column)
    
            backTrack(row + 1)

            board[row][column] = "."
            columns.delete(column)
            posDiag.delete(row + column)
            negDiag.delete(row - column)
        }
    }
    
    backTrack(0)
    
    return res
}
console.log(nQueen(4));
