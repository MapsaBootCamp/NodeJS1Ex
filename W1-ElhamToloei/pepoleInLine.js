function pepoleInLine(arr, K) {
arr= arr.split('')
let sum = arr.reduce((acc, val, ind)=> val==="R" ? acc+ ind : acc+ arr.length-1+ind ,0)
    for (let k = 1; k <= K; k++) {
        for (let i = 0 , j = arr.length-1 ; i < arr.length/2 &&  arr.length/2  <= j ; i++ , j--) {
            if ((arr[i] !== 'R')) {
                arr[i] = 'R'
                sum+= arr.length -1 -i -i 
                break
            }
            if (arr[j] !== 'L') {
                arr[j] = 'L'
                sum+= j - (arr.length -1 -j)
                break
            }
        }
    }
    return (arr.join('') , sum)
}
const arrLR = "LLRRRLLRLLRLLRRRL"
console.log(pepoleInLine(arrLR, 7));