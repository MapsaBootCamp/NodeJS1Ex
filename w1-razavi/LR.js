function mohasebeh(array){
    let arr1 =Array(a.length ).fill(0);
    
    for(i = 0;i<array.length;i++){
        if(array[i]=="R"){
            for(j=i +1;j<array.length ;j++)
                 arr1[i]+=1 ;
        }
        if(array[i]=="L"){
            for(k= i -1;k>= 0 ;k--)
                arr1[i]+=1

        }
        
    }
        let sum = 0;
        for(let p=0;p<arr1.length;p++ )
            sum +=arr1[p];
            
        
        return sum;
   
    }

function taghir(adad){
    let i =0;
    let j =adad.length -1;
    let result=[];
    while(i<j){
        if(adad[i]=="L")
            adad[i]="R"
            
        if(adad[j]=="R")
            adad[j]="L"    
        i++;
        j--;
        
       result.push(mohasebeh(adad));
        
    }
    return result;

}
let a =["L","R","R","R","L","L","L","R","L","L","R","L"];
let b =["L","L","L","L","L","R","R","R","R","R",];
let c =["L","R","L","R","L","R","L","R","L"];
console.log(taghir(a));
 

