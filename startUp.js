let n=4;
const f=[1,2,3,3];
const b=[1,3,2,3];
const m=[100,50,50,50];
console.log(mostMoney(n,f,b,m));

function mostMoney(n,f,b,m){
    let mostM=0;
    for(let i=0;i<n;i++){
        let temp=0;
        for(let j=i;j<n;j++){
            if(f[i]>=f[j] || b[i]>=b[j]){
                temp+=m[j];
            }
        }
        if(temp>mostM) mostM=temp;
    }
    return mostM;
}
