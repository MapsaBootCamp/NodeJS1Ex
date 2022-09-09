let line="LLRRL"
let splitedLine=line.split('')
let k =3;
let counter=0;


function findMostVisited(splitedLine , k){
for (let i=0 , j=line.length ; i < line.length/2 , j>i ; i++ , j--) {
   
  
 

    if(splitedLine[i] !== 'R'){
        let leftVision=0;
        splitedLine[i]='R';
        leftVision += line.length-1-i + leftVision;
        console.log(leftVision);
        console.log(line.split(''));
        }



        // if(splitedLine[j] !== 'L'){
        //     let rightVision=0;
        //     splitedLine[j]='L';
        //     rightVision += line.length-1-j + rightVision;
        //     console.log(rightVision);
        // }
           
    

   

}


}
console.log(findMostVisited(line));