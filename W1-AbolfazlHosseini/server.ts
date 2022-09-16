const distances = [
    [0 ,6 ,20,20],
    [6 ,0 ,20,20],
    [20,20,0 ,12],
    [20,20,12,0 ]
]
function calculate() {
let lefWires,rightWires;
let sum = 0
sum+=distances[0][distances.length-1]
for(let i = 1;i<distances.length-1;i++){
    if(i<distances.length/2){
        sum+=distances[i][0]/2
    }else{
        sum+=distances[i][distances.length-1]/2
    }
}
return sum
}
console.log(calculate())