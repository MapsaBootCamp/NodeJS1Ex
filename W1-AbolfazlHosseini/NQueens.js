const N = 11
let chessBoard = []
for(let i = 0 ;i<N;i++){
    let arr = []
    for(let j = 0 ;j<N;j++)
        arr.push(0)
    chessBoard.push(arr)
}
let done = false
let queensInserted = 0
function insertQueen(i,j) {
    chessBoard[i][j] = 1
    for(let k =1;;k++){
        if(i+k>N-1 || j+k>N-1)
            break
        chessBoard[i+k][j+k]-=1
    }
 
    for(let k =1;;k++){
        if(i-k<0 || j-k<0)
            break
        chessBoard[i-k][j-k]-=1
    }
    for(let k =1;;k++){
        if(i+k>N-1 || j-k<0)
            break
        chessBoard[i+k][j-k]-=1
    }
    for(let k =1;;k++){
        if(i-k<0 || j+k>N-1)
            break
        chessBoard[i-k][j+k]-=1
    }
    for(let k =1;;k++){
        if(j+k>N-1)
            break
        chessBoard[i][j+k]-=1
    }
    for(let k =1;;k++){
        if(i-k<0)
            break
        chessBoard[i-k][j]-=1
    }

    for(let k =1;;k++){
        if(i+k>N-1)
            break
        chessBoard[i+k][j]-=1
    }
    for(let k =1;;k++){
        if(j-k<0)
            break
        chessBoard[i][j-k]-=1
    }
}
function removeQueen(i,j) {
    chessBoard[i][j] = 0
    for(let k =1;;k++){
        if(i+k>N-1 || j+k>N-1)
            break
        chessBoard[i+k][j+k]+=1
    }
    for(let k =1;;k++){
        if(i-k<0 || j-k<0)
            break
        chessBoard[i-k][j-k]+=1
    }
    for(let k =1;;k++){
        if(i+k>N-1 || j-k<0)
            break
        chessBoard[i+k][j-k]+=1
    }
    for(let k =1;;k++){
        if(i-k<0 || j+k>N-1)
            break
        chessBoard[i-k][j+k]+=1
    }
    for(let k =1;;k++){
        if(j+k>N-1)
            break
        chessBoard[i][j+k]+=1
    }
    for(let k =1;;k++){
        if(i-k<0)
            break
        chessBoard[i-k][j]+=1
    }
    for(let k =1;;k++){
        if(i+k>N-1)
            break
        chessBoard[i+k][j]+=1
    }
    for(let k =1;;k++){
        if(j-k<0)
            break
        chessBoard[i][j-k]+=1
    }
}
function printChessboard(){
    for(let k = 0 ; k < N ; k++){
        let line = ""
            for(let o = 0 ;o < N ; o++){
                if(chessBoard[k][o]==1)
                    line+="* "
                    else{
                        line+="o "
                    }
        }
        console.log(line)
    }
}
function putQueen(){
for(let i = 0 ;i<N;i++){
    for(let j = 0 ;j<N;j++){
        if(chessBoard[i][j]==0){
                queensInserted++
                insertQueen(i,j)
                if(queensInserted==N){
                    printChessboard()
                    done = true
                    return
                }
                putQueen()
                if(!done)
                {
                    queensInserted--
                    removeQueen(i,j)
            }
            }
    }
}
}
putQueen()