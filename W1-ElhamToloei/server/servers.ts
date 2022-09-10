// const net2D = [[0, 6, 20, 20],
//     [6, 0, 20, 20],
//     [20, 20, 0, 12],
//     [20, 20, 12, 0]]

const net2D = [[0, 18, 10, 10, 18, 18],
            [18, 0, 18, 18, 14, 14],
            [10, 18, 0, 4, 18, 18],
            [10, 18, 4, 0, 18, 18],
            [18, 14, 18, 18, 0, 6],
            [18, 14, 18, 18, 6, 0]]

function netCable(net2D:number[][]): number {
    const node = net2D.length
    // const swch = node -2
    const net : number[] = net2D.flat();    // let net : number[] = []; for(let i = 0; i < net2D.length; i++){ net = net.concat(net2D[i]);}
    
    const counts :any = {};
    net.forEach( x => { counts[x]= (counts[x] || 0) + 1;});

    let cableLen=0;
    for (const key in counts) {
        let numKey = Number(key)
        cableLen += numKey / 2
        if (counts[key] >= node /*&& counts[key] % 4 !== 0*/) {
            cableLen += numKey / 2
        }
    }
    return cableLen
}

console.log(netCable(net2D));

// export {};