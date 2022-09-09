const cake = [1 ,3, 4, 2]
const students = 1

function minCost(cake:number[], numOfStu: number): number {
    let minCash: number = 0
    if (numOfStu === 1)
        for(let j=0; j < cake.length - 1; j++){
            minCash = cake[j] > cake[j+1] ? cake[j] : cake[j+1]
        }        
    else if (numOfStu === 2) {
        minCash = cake[0] > cake[length-1] ?    cake[0] : cake[length-1]
    }
    else
        for(let j=0; j < cake.length - 1; j++){
            minCash = cake[j] < cake[j+1] ? cake[j] : cake[j+1]
        }  
    return minCash
}

console.log(minCost(cake , students));
