const arr= [9,0,2,1,7,4,3,5]
const num = 6
/***** raveshe baraye arrye namonazam O(n) *****/
// let newArray = Object.entries(arr)
let map = new Map();

// let sum =0
for (let i = 0; i < arr.length; i++) {
    let dis = num - arr[i]
    if(map.get(dis)){
        console.log(dis , arr[i]);
    }
    else{
        map.set(arr[i],i)
    }
}