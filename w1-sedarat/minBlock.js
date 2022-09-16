let testCases = 3;         //number of test cases
let pageRows = [5, 10, 5]     //number of rows
let pageCulomns =[7, 10, 7]      //number of culomns
let blockRows =[1, 2, 2]       //row length for blocks
let blockCulomns =[1, 3, 1]       //culomns length for blocks

for(let i = 0 ; i < testCases ; i++){
    minBlock(pageRows[i], pageCulomns[i], blockRows[i], blockCulomns[i])
}

function minBlock(pageRows, pageculomns, blockRows, blockCulomns){
    //maximum distance between 2 blocks is blockRows - 1) rows && blockCulomns - 1 culomns
    //minimum number of blocks in row is blockRows + (blockRows - 1)
    let minBlocksInRow = pageRows % (blockRows + (blockRows - 1)) < blockRows ?
    Math.floor(pageRows / (blockRows + (blockRows - 1))) :
    Math.floor(pageRows / (blockRows + (blockRows - 1))) + 1
    //minimum number of blocks in culomn is  blockCulomns + (blockCulomns - 1)
    let minBlocksInCulomn = pageculomns % (blockCulomns + (blockCulomns - 1)) < blockCulomns ?
    Math.floor(pageculomns / (blockCulomns + (blockCulomns - 1))) : 
    Math.floor(pageculomns / (blockCulomns + (blockCulomns - 1))) + 1
    //minimum blocks is minBlocksInRow * minBlocksInCulomn
    console.log(minBlocksInRow * minBlocksInCulomn);
}