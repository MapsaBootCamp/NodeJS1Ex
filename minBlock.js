let t=3;
let n=[5,10,5]
let m=[7,10,7]
let a=[1,2,2]
let b=[1,3,1]

for(let i=0;i<t;i++){
    minBlock(n[i], m[i], a[i], b[i])
}

function minBlock(n,m,a,b){
    let A=n%(a+(a-1))<a ? Math.floor(n/(a+(a-1))) : Math.floor(n/(a+(a-1)))+1
    let B=m%(b+(b-1))<b ? Math.floor(m/(b+(b-1))) : Math.floor(m/(b+(b-1)))+1
    console.log(A*B);
}