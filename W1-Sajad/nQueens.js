


function nQueen(numberOfQueens,visitedFirstTiles = null,path = []) {
    
    if(visitedFirstTiles == null){
        visitedFirstTiles = Array(numberOfQueens).fill(Array(numberOfQueens).fill(0))
    }
    if()
    for(let i = 0;i<visitedFirstTiles.length;i++ ){
        for(let j =0;j<visitedFirstTiles.length;j++){
            nQueen(numberOfQueens,visitedFirstTiles,path)
        }
    }


}


function collideCheck() {
    
}