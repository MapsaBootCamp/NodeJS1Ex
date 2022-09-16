
function cupCake (cakeList: number[],numberOfStudents: number): number{
    if(numberOfStudents == 1) return Math.max(...cakeList)
    else if(numberOfStudents == 2){
     const result = cakeList[0]>cakeList[cakeList.length-1]?        cakeList[cakeList.length-1]:cakeList[0]
     return result        
    }
    const result = Math.min(...cakeList)
        return result 
}


const money = cupCake([5 ,4 ,3 ,2 ,2],2)
console.log(money);
