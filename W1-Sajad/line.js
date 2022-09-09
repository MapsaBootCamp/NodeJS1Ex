

function line(str) {
    const arr = str.split('')
    let unchangedResult = arr.reduce((total,value,index,arr)=> { 
        total+= (value == 'R')? arr.length-1-index:index
        return total
    },0 )
    let mid = Math.floor((arr.length-1)/2)
    
    for(let i=0;i<=mid;i++){
        if(arr[i] == 'L'){
            console.log(unchangedResult += arr.length-1-i-i);
        }else if(arr[i] == 'R'){
            console.log(unchangedResult);
        }
        if(arr[arr.length-1-i] == 'R'){
            console.log(unchangedResult += arr.length-1-i-i);
        }else if(arr[arr.length-1-i] == 'L'){
            console.log(unchangedResult);
        }
}
console.log('//////////////////');
}
line('LLLLLRRRRR')
line('LRRLL')
line('LRLRLRLRL')