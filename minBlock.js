let t = 3;         //number of test cases
let n = [5, 10, 5]     //number of rows
let m =[7, 10, 7]      //number of culomns
let a =[1, 2, 2]       //row length for blocks
let b =[1, 3, 1]       //culomns length for blocks

for(let i = 0 ; i < t ; i++){
    minBlock(n[i], m[i], a[i], b[i])
}

function minBlock(n, m, a, b){
    //maximum distance between 2 blocks is a-1 rows && b-1 culomns
    //minimum number of blocks in row is a + (a - 1) 
    let minBlocksInRow = n % (a + (a - 1)) < a ? Math.floor(n / (a + (a - 1))) : Math.floor(n / (a + (a - 1))) + 1
    //minimum number of blocks in culomn is  b + (b - 1) 
    let minBlocksInCulomn = m % (b + (b - 1)) < b ? Math.floor(m / (b + (b - 1))) : Math.floor(m / (b + (b - 1))) + 1
    //minimum blocks is minBlocksInRow * minBlocksInCulomn
    console.log(minBlocksInRow * minBlocksInCulomn);
}