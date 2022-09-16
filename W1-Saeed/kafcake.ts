function kafcake(baze: number, cakes: number[]){
    if(baze == 1) return Math.max(...cakes)

    if(baze == 3) return Math.min(...cakes)
    
    return cakes[0] <= cakes[cakes.length - 1] ? cakes[0] : cakes[cakes.length - 1]
}        
console.log(kafcake(2, [3, 2, 3]));
console.log(kafcake(1, [1, 3, 4, 2]));
console.log(kafcake(3, [5,4,3,2,2]));
console.log(kafcake(2 , [8, 12, 3, 2, 6, 14]));