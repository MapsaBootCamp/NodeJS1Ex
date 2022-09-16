

const minBlock = (n,m,a,b,result=[0,0])=>{

    if(n<a && m<b) return result[0]*result[1]
    else if(n<a && !m<b) {
        result[1]+=1
        return minBlock(n,m-(b-1+b),a,b,result)}
    else if(!n<a && m<b) {
        result[0]+=1
        return minBlock(n-(a-1+a),m,a,b,result)}
    result[0]+=1
    result[1]+=1
    return minBlock(n-(a-1+a),m-(b-1+b),a,b,result)
}

console.log(minBlock(11,11,2,3));