// if the input array of the servers has odd members the first side gets the 1 difference 
// the array starts with the most inside server
const servers = (arr: any[]) :number => {
    let middleIndex:number = Math.floor((arr.length-1)/2)
    arr = [arr[0],arr[middleIndex+1].slice(middleIndex+1)]
    let result:number = 0
    for(let elm of arr){
        for(let i = 1;i<=middleIndex;i++){
            result += elm[i]/2
        }
    }   
result += arr[0][middleIndex+1]
return result
}



const result = servers([[0 ,6 ,20 ,20]
    ,[6 ,0 ,20 ,20]
    ,[20 ,20 ,0 ,12]
    ,[20 ,20 ,12 ,0]])

    console.log(result);