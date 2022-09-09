// https://quera.org/problemset/147636/

function maxCashOfInvitedFriends(pro) {
    let max = 0 , c = 0 , stack=[]
    for (let i = 0; i < pro.length-1; i++) {
        stack[0]=pro[i]
        for (let j = i+1; j < pro.length; j++) {
            if (!((pro[i].f < pro[j].f && pro[i].b < pro[j].b) || 
                (pro[j].f < pro[i].f && pro[j].b < pro[i].b))) {    // nesbat be ham haghir nabashan
                    stack.push(pro[j])
                    c++     // baraye vaghti k tabe bazgashti hich taghiri nakard o haghiri tush nabud
            }  
        }
        let sum = stack.reduce((acc, val,ind) => { return acc+val.c},0)
        if(max< sum)    max=sum
        if (stack.length>2) {
            if (stack.length==c+1)  return sum
            maxCashOfInvitedFriends(stack)
        }
        stack = []
    }
    return max    
}

// const property = [{f:1,b:1,c:100},{f:2,b:3,c:50},{f:3,b:2,c:50}].sort((a,b)=>b.c - a.c)
const property = [{f:3,b:3,c:50},{f:1,b:1,c:100},{f:2,b:3,c:50},{f:3,b:2,c:50}].sort((a,b)=>b.c - a.c)
// const property = [{f:5,b:3,c:50},{f:1,b:1,c:10},{f:6,b:2,c:50},{f:4,b:2,c:70},{f:6,b:4,c:60}].sort((a,b)=>b.c - a.c)
console.log(maxCashOfInvitedFriends(property));