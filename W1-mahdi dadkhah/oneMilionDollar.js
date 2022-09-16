let mainMatrix=[1 ,10]
let selectedMatrix=[1, 1]
let counterSatr=0;
let counterSoton=0;
if(mainMatrix[0] == 0 || mainMatrix[1] == 0 ||selectedMatrix[0] == 0 || selectedMatrix[0] == 0  ){
   console.log("not found");
}
else{

while(mainMatrix[0]-(selectedMatrix[0]-1)-selectedMatrix[0]>=selectedMatrix[0]){
    mainMatrix[0]=mainMatrix[0]-(selectedMatrix[0]-1)-selectedMatrix[0];
    counterSatr ++
}

while(mainMatrix[1]-(selectedMatrix[1]-1)-selectedMatrix[1]>=selectedMatrix[1]){
    mainMatrix[1]=mainMatrix[1]-(selectedMatrix[1]-1)-selectedMatrix[1];
    counterSoton ++
   
}
console.log((counterSatr+1) * (counterSoton+1));
}
