


function nQueen(numberOfQueens,visitedFirstTiles = null,unusableTiles = null,path = []) {
    let nextTile;
    if(visitedFirstTiles == null){
        visitedFirstTiles = Array(numberOfQueens).fill([])
        unusableTiles = Array(numberOfQueens).fill([])

        for(let i = 0;i<numberOfQueens;i++){
            visitedFirstTiles[i] = Array(numberOfQueens).fill(0)
            unusableTiles[i] = Array(numberOfQueens).fill(0)

        }
        
    }
    if(path.length == 0) {
        nextTile = nextTileChooser(visitedFirstTiles)
        if(!nextTile) return 'not possible'
        visitedFirstTiles[nextTile[0]][nextTile[1]] = 1}
    else{ nextTile = nextTileChooser(unusableTiles)
        if(!nextTile){
            if(path.length == numberOfQueens) return path
            path = []
            unusableTiles = Array(numberOfQueens).fill([])
            for(let i = 0;i<numberOfQueens;i++){
                unusableTiles[i] = Array(numberOfQueens).fill(0)
            }
            return nQueen(numberOfQueens,visitedFirstTiles,unusableTiles,path)
        } 
    }
    path.push(nextTile)
    unusableTiles =  tileRemover(nextTile,unusableTiles)
    const result = nQueen(numberOfQueens,visitedFirstTiles,unusableTiles,path)
    return result 
}


function tileRemover(nextTile,unusableTiles) {
    for(let i=0;i<unusableTiles.length;i++){
        for(let j=0;j<unusableTiles.length;j++){
            if(i == nextTile[0]) unusableTiles[i][j] = 1
            if(j == nextTile[1]) unusableTiles[i][j] = 1
            if(i-j == nextTile[0]-nextTile[1]) unusableTiles[i][j] = 1
        }
    }
    return unusableTiles
}
function nextTileChooser(arr){
    const result = []
    for(let i = 0;i<arr.length;i++){
        for(let j = 0;j<arr.length;j++){
            if(!arr[i][j]) return  [i,j]
        }
    }
    return false
}




console.log(nQueen(4));