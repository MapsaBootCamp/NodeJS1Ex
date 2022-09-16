const candies1 = [3,2,3]
const candies2 = [5,4,3,2,2]
const candies3 = [1,3,4,2]
const NumOfStudents1 = 2
const NumOfStudents2 = 3
const NumOfStudents3 = 1
function findMax(arr:number[]) {
    return arr.reduce((prev,cur)=>{
        if(cur>prev)
           return cur
       else
           return prev
       },0)
}
function findMin(arr:number[]){
    arr.reduce((prev,cur)=>{
        if(cur<prev)
           return cur
       else
           return prev
       },Infinity)
}
function calculate(candies:number[],numberOfStudents:number){
    if(numberOfStudents==1){
        return findMax(candies)
    }
    if(numberOfStudents==2){
        let best = Infinity
        for(let i = 1;i<candies.length-1;i++){
            const min = Math.min(findMax(candies.slice(0,i)),findMax(candies.slice(i,candies.length)))
            if(best>min){
                best = min
            }
        }
        return best
    }
    if(numberOfStudents>2){
        return findMin(candies)
    }
}
console.log(calculate(candies1,NumOfStudents1))
console.log(calculate(candies2,NumOfStudents2))
console.log(calculate(candies3,NumOfStudents3))